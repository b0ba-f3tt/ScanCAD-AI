interface Props {
  count: number;
}

export default function FrameCounter({ count }: Props) {
  return (
    <div className="mt-4 text-lg font-semibold">
      Frames Captured: {count}
    </div>
  );
}