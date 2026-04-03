'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useChat } from '@/hooks/useChat';
import DesktopLaunchpad from '@/components/desktop/DesktopLaunchpad';
import DesktopTakeover from '@/components/desktop/DesktopTakeover';
import MobileLaunchpad from '@/components/mobile/MobileLaunchpad';
import MobileTakeover from '@/components/mobile/MobileTakeover';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const chat = useChat();

  if (isMobile) {
    return chat.isActive
      ? <MobileTakeover {...chat} />
      : <MobileLaunchpad {...chat} />;
  }

  return chat.isActive
    ? <DesktopTakeover {...chat} />
    : <DesktopLaunchpad {...chat} />;
}
