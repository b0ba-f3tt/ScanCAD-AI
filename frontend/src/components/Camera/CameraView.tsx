import { memo } from "react";

interface Props {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

function CameraView({ videoRef }: Props) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-[500px] object-cover bg-black"
    />
  );
}

export default memo(CameraView);