# Exactly AI Homepage — CLAUDE.md

## What this is

Homepage for Exactly AI Solutions. It has two states:
- **Launchpad** — the landing page with hero copy, chat input, and suggestion pills
- **Takeover** — full-screen chat interface once the user sends a message

Both states have desktop and mobile variants. The breakpoint is `max-width: 768px`.

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **CSS Modules** — one `.module.css` file per component, no Tailwind
- **Google Fonts** — Bebas Neue (display) + DM Sans (body), loaded via `next/font/google`
- **`@mastra/client-js`** — calls the Mastra Cloud agent for chat
- Deploy target: Vercel

## Project structure

```
src/
  app/
    layout.tsx          # Font loading, metadata
    globals.css         # CSS custom properties + keyframes
    page.tsx            # Entry point — routes to the right component
    api/
      chat/
        route.ts        # POST handler — proxies messages to Mastra, streams back SSE
  hooks/
    useChat.ts          # All chat state: messages, isTyping, send(), reset()
    useMediaQuery.ts    # SSR-safe viewport detection
  components/
    shared/
      LogoWordmark.tsx  # Inline SVG wordmark (used everywhere)
      MessageBubble.tsx # Renders a single user or bot message
      TypingIndicator.tsx # Three-dot bounce animation
    desktop/
      TopNav.tsx          # Logo + 4 nav buttons (both launchpad and takeover)
      DesktopLaunchpad.tsx
      DesktopTakeover.tsx
    mobile/
      MobileNav.tsx       # Sticky nav with animated hamburger
      Drawer.tsx          # Slide-in nav drawer from right
      MobileLaunchpad.tsx
      MobileTakeover.tsx
spec/                   # Reference HTML/CSS/images the UI was built from
  Desktop/
  Mobile/
  Assets/
```

## How state flows

`page.tsx` owns nothing — it just reads two hooks and renders the right component:

```
useMediaQuery('(max-width: 768px)') → isMobile
useChat()                           → { isActive, messages, isTyping, context, send, reset }

isMobile + isActive → which of the four components to render
```

All four page components (`DesktopLaunchpad`, `DesktopTakeover`, `MobileLaunchpad`, `MobileTakeover`) receive `ChatState & ChatActions` spread as props. They never manage chat state themselves.

## The chat hook (`useChat.ts`)

The `Message` type is `{ id: string; role: 'user' | 'bot'; text: string }`.

`send(text, context?)`:
1. Appends the user message and sets `isTyping: true`
2. POSTs `{ messages }` to `/api/chat`
3. Reads the SSE stream — on the first text chunk, adds an empty bot message and stops the typing indicator
4. Each subsequent chunk appends to the bot message text (streaming effect)
5. On error: shows a fallback error message

`reset()` — clears everything and returns to launchpad.

The `context` field tracks which nav item or pill triggered the chat (e.g. `'quick-wins'`, `'cro-chatbots'`). It's passed to `TopNav` to highlight the active item.

## The API route (`src/app/api/chat/route.ts`)

Receives: `POST /api/chat` with body `{ messages: Array<{ role: 'user'|'bot', text: string }> }`

1. Converts messages to Mastra format (`bot` → `assistant`, `text` → `content`)
2. Calls `client.getAgent('exactly-chat-agent').stream(messages)` against `https://lemon-billions-engine.mastra.cloud`
3. Processes Mastra's SSE via `processDataStream({ onChunk })` — chunks have shape `{ type: 'text-delta', payload: { text: string } }`
4. Re-emits each text chunk as a simple SSE line: `data: {"text": "..."}\n\n`
5. Ends the stream with `data: [DONE]\n\n`

The frontend parses this with a plain `fetch` + `ReadableStream` reader — no external streaming library needed.

## Design system

Defined in `globals.css` as CSS custom properties:

| Variable | Value |
|---|---|
| `--green` | `#7D8F3C` |
| `--navy` | `#1B2A4A` |
| `--orange` | `#FF6B35` |
| body background | `#DBEAFE` |
| `--font-display` | Bebas Neue |
| `--font-body` | DM Sans |

Global keyframes: `fadeUp` (hero entry animation), `typingBounce` (typing indicator dots), `pulse` (status dot).

## Suggestion pills / nav contexts

Both launchpad variants have 5 clickable pills. Clicking a pill calls `send(label, context)` which immediately activates the takeover with the bot responding in that context.

The desktop `TopNav` has 4 nav items with the same behaviour. Each item has a two-line label + a hidden sub-label that appears on hover.

| Context string | Meaning |
|---|---|
| `quick-wins` | Quick Wins For Your Business |
| `deep-dives` | Deep Dive Reports |
| `cro-chatbots` | CRO Chatbot For My Website |
| `exactly-difference` | The Exactly Difference |
| `swot` | Your SWOT |
| `ai-visibility` | AI Visibility |
| `cro-score` | CRO Score |

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Key conventions

- Every component file has a co-located `.module.css` — never add styles to `globals.css` except for truly global tokens/keyframes.
- Components never import from each other laterally — shared components live in `components/shared/`.
- No component manages its own chat state. All state lives in `useChat` and flows down via props.
- The `send()` function is the only way to trigger state transitions. There is no separate "activate chat" call — sending the first message implicitly sets `isActive: true`.
