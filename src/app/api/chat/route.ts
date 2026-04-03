import { MastraClient } from '@mastra/client-js';

const client = new MastraClient({
  baseUrl: process.env.MASTRA_BASE_URL!,
});

interface IncomingMessage {
  role: 'user' | 'bot';
  text: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: IncomingMessage[] } = await req.json();

  const agent = client.getAgent('exactly-chat-agent');

  const mastraMessages = messages.map((m) => ({
    role: m.role === 'bot' ? ('assistant' as const) : ('user' as const),
    content: m.text,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mastraStream = await agent.stream(mastraMessages as any);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        await mastraStream.processDataStream({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChunk: async (chunk: any) => {
            if (chunk.type === 'text-delta' && chunk.payload?.text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: chunk.payload.text })}\n\n`)
              );
            }
          },
        });
      } catch (err) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`)
        );
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
