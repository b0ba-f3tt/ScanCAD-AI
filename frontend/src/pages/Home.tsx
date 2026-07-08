import Header from "../components/Layout/Header";
import CameraPlaceholder from "../components/Camera/CameraPlaceholder";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6">
        <CameraPlaceholder />
      </main>
    </div>
  );
}