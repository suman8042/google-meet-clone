// VideoPlayer.jsx
import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && stream) {
      video.srcObject = stream;

      video.play().catch((error) => {
        console.error('Error playing local video stream:', error);
      });
    }

    return () => {
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      className="local-video"
    ></video>
  );
};

export default VideoPlayer;
