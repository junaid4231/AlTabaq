export default function WaveSeparator() {
  return (
    <div className="w-full overflow-hidden bg-brand-bg">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-24"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="#f2ebdf"
          opacity="1"
        />
      </svg>
    </div>
  );
}
