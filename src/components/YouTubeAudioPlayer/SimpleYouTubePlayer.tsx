import React, { useState, useRef, useEffect, useCallback } from 'react';

interface YouTubeVideo {
  id: string;
  url: string;
  title?: string;
}

interface SimpleYouTubePlayerProps {
  videos: YouTubeVideo[];
}

export const SimpleYouTubePlayer: React.FC<SimpleYouTubePlayerProps> = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentVideo = videos[currentVideoIndex];

  const getEmbedUrl = useCallback((videoUrl: string) => {
    const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&showinfo=0&rel=0&modestbranding=1`;
  }, []);

  const togglePlayPause = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(
        `{"event":"command","func":"${command}","args":""}`,
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = getEmbedUrl(currentVideo.url);
    }
    
    // Auto-advance to next video when current one ends
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'video-progress' && data.info === 0) { // Video ended
          const nextIndex = (currentVideoIndex + 1) % videos.length;
          setCurrentVideoIndex(nextIndex);
          setIsPlaying(false);
        }
      } catch {
        // Ignore invalid JSON
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentVideoIndex, currentVideo.url, getEmbedUrl, videos.length]);

  if (!videos.length) {
    return null;
  }

  return (
    <>
      {/* Hidden iframe for audio playback */}
      <iframe
        ref={iframeRef}
        src={getEmbedUrl(currentVideo.url)}
        style={{ display: 'none' }}
        allow="autoplay; encrypted-media"
        title="YouTube Audio Player"
      />
      
      {/* Simple play/stop button */}
      <button
        onClick={togglePlayPause}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2 px-3 text-sm font-medium transition-colors border-0 flex items-center justify-center gap-2"
        style={{ backgroundColor: '#4f46e5' }}
        aria-label={isPlaying ? 'Stop music' : 'Play LoFi Girl hip hop radio'}
      >
        {isPlaying ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            Stop Music
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Play LoFi Girl
          </>
        )}
      </button>
    </>
  );
};
