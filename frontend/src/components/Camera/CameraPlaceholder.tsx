import useCamera from "../../hooks/useCamera";
import CameraView from "./CameraView";

export default function CameraPlaceholder() {
  const {
    videoRef,
    startScan,
    stopScan,
    frameCount,
    frames,
    isScanning,
  } = useCamera();

  return (
    <div className="w-full">
      {/* Scan Controls */}
      <div className="flex items-center gap-4 mb-6">
        {!isScanning ? (
          <button
            onClick={startScan}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Start Scan
          </button>
        ) : (
          <button
            onClick={() => {
              stopScan();
              console.log("Captured Frames:", frames);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Stop Scan
          </button>
        )}

        <div className="font-semibold text-gray-700">
          Frames Captured: {frameCount}
        </div>
      </div>

      {/* Camera Preview */}
      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-lg bg-black">
        <CameraView videoRef={videoRef} />
      </div>

      {/* Scan Information */}
      <div className="mt-4 rounded-lg bg-gray-100 p-4">
        <p className="text-gray-700">
          <strong>Stored Frames:</strong> {frames.length}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Slowly move your phone around the object while scanning.
        </p>
      </div>
    </div>
  );
}