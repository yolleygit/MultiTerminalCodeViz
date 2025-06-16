import React, { useState, useRef, useEffect, useCallback } from 'react';

interface YouTubeVideo {
  id: string;
  url: string;
  title?: string;
}

interface YouTubeAudioPlayerProps {
  videos: YouTubeVideo[];
  className?: string;
}

export const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ 
  videos, 
  className = '' 
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentVideo = videos[currentVideoIndex];

  const getEmbedUrl = useCallback((videoUrl: string) => {
    const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1`;
  }, [isPlaying]);

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

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        `{"event":"command","func":"${command}","args":""}`,
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = getEmbedUrl(currentVideo.url);
    }
  }, [currentVideoIndex, currentVideo.url, getEmbedUrl]);

  if (!videos.length) {
    return <div className="text-gray-500">No videos available</div>;
  }

  return (
    <div className={`youtube-audio-player ${className}`}>
      {/* Hidden iframe for audio playback */}
      <iframe
        ref={iframeRef}
        src={getEmbedUrl(currentVideo.url)}
        style={{ display: 'none' }}
        allow="autoplay; encrypted-media"
        title="YouTube Audio Player"
      />
      
      {/* Control buttons */}
      <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-600">
        {/* Play/Stop button */}
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Speaker/Mute button */}
        <button
          onClick={toggleMute}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            isMuted ? 'text-red-400 hover:text-red-300' : 'text-gray-300 hover:text-white'
          }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm-2.5-8.77c-.6-.34-1.37-.05-1.5.65L12 7.3c-.49-.27-1.07-.27-1.56 0L9.5 6.23c-.13-.7-.9-.99-1.5-.65L7.5 6.1c-.4.23-.5.77-.24 1.15L8.41 8.8l-4.92 4.92c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.92-4.92 1.55 1.55c.38.26.92.16 1.15-.24l.52-.9c.34-.6.05-1.37-.65-1.5l-1.07-.5c.27-.49.27-1.07 0-1.56l.5-1.07c.7-.13.99-.9.65-1.5z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        {/* Next button */}
        <button
          onClick={nextVideo}
          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white rounded transition-colors"
          aria-label="Next video"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>

        {/* Current video info */}
        <div className="ml-3 flex-1 min-w-0">
          <div className="text-sm text-gray-300 truncate">
            {currentVideo.title || `Video ${currentVideoIndex + 1} of ${videos.length}`}
          </div>
        </div>
      </div>
    </div>
  );
};