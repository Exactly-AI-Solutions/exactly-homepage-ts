'use client';
import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export interface ChatState {
  isActive: boolean;
  messages: Message[];
  isTyping: boolean;
  context: string | null;
}

export interface ChatActions {
  send: (text: string, context?: string) => void;
  reset: () => void;
}

let nextId = 1;
function uid() {
  return String(nextId++);
}

export function useChat(): ChatState & ChatActions {
  const [state, setState] = useState<ChatState>({
    isActive: false,
    messages: [],
    isTyping: false,
    context: null,
  });

  const send = useCallback(
    (text: string, context?: string) => {
      const userMsg: Message = { id: uid(), role: 'user', text };
      const botId = uid();
      const newContext = context ?? state.context;
      const apiMessages = [...state.messages, userMsg];

      // Add user message and show typing indicator
      setState((prev) => ({
        ...prev,
        isActive: true,
        isTyping: true,
        context: newContext,
        messages: [...prev.messages, userMsg],
      }));

      let botMessageAdded = false;

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
        .then(async (response) => {
          if (!response.ok || !response.body) {
            throw new Error(`HTTP ${response.status}`);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (data === '[DONE]') return;

              try {
                const parsed = JSON.parse(data) as { text?: string; error?: string };
                if (parsed.error) throw new Error(parsed.error);

                if (parsed.text) {
                  if (!botMessageAdded) {
                    // First chunk: add bot message and stop typing indicator
                    botMessageAdded = true;
                    setState((prev) => ({
                      ...prev,
                      isTyping: false,
                      messages: [
                        ...prev.messages,
                        { id: botId, role: 'bot', text: parsed.text! },
                      ],
                    }));
                  } else {
                    // Subsequent chunks: append text to existing bot message
                    setState((prev) => ({
                      ...prev,
                      messages: prev.messages.map((m) =>
                        m.id === botId ? { ...m, text: m.text + parsed.text } : m
                      ),
                    }));
                  }
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        })
        .catch(() => {
          if (!botMessageAdded) {
            setState((prev) => ({
              ...prev,
              isTyping: false,
              messages: [
                ...prev.messages,
                {
                  id: botId,
                  role: 'bot',
                  text: 'Sorry, something went wrong. Please try again.',
                },
              ],
            }));
          } else {
            setState((prev) => ({
              ...prev,
              isTyping: false,
              messages: prev.messages.map((m) =>
                m.id === botId
                  ? { ...m, text: m.text + '\n\n[Connection lost. Please try again.]' }
                  : m
              ),
            }));
          }
        });
    },
    [state.messages, state.context]
  );

  const reset = useCallback(() => {
    setState({ isActive: false, messages: [], isTyping: false, context: null });
  }, []);

  return { ...state, send, reset };
}
