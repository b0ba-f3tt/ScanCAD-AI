import { useEffect, useRef, useState } from "react";
import type { ScanFrame } from "../types/frame";

export default function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const framesRef = useRef<ScanFrame[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const intervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [frameCount, setFrameCount] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
      }
    }

    startCamera();

    return () => {
      mounted = false;

      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function captureFrame() {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (video.videoWidth === 0) return;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        framesRef.current.push({
          id: Date.now(),
          timestamp: Date.now(),
          blob,
        });

        setFrameCount((prev) => prev + 1);
      },
      "image/jpeg",
      0.9
    );
  }

  function startScan() {
    if (intervalRef.current !== null) return;

    framesRef.current = [];
    setFrameCount(0);
    setIsScanning(true);

    intervalRef.current = window.setInterval(captureFrame, 500);
  }

  function stopScan() {
    setIsScanning(false);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    console.log(framesRef.current);
  }

  return {
    videoRef,
    startScan,
    stopScan,
    frameCount,
    frames: framesRef.current,
    isScanning,
  };
}