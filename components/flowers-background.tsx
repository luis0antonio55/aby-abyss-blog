type FlowerProps = {
  className?: string;
  size?: number;
  petalColor?: string;
  centerColor?: string;
  opacity?: number;
  rotate?: number;
};

function Flower({
  className,
  size = 60,
  petalColor = "#fbcfe8",
  centerColor = "#f472b6",
  opacity = 0.5,
  rotate = 0,
}: FlowerProps) {
  const petal = "M0,-6 C-16,-16 -16,-38 0,-46 C16,-38 16,-16 0,-6 Z";
  return (
    <svg
      className={className}
      style={{ width: size, height: size, opacity }}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(50 50) rotate(${rotate})`}>
        <path d={petal} fill={petalColor} />
        <path d={petal} fill={petalColor} transform="rotate(72)" />
        <path d={petal} fill={petalColor} transform="rotate(144)" />
        <path d={petal} fill={petalColor} transform="rotate(216)" />
        <path d={petal} fill={petalColor} transform="rotate(288)" />
        <circle r="9" fill={centerColor} />
      </g>
    </svg>
  );
}

type BunnyProps = {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
  flip?: boolean;
  rotate?: number;
};

function Bunny({
  className,
  size = 70,
  color = "#f6c6da",
  opacity = 0.45,
  flip = false,
  rotate = 0,
}: BunnyProps) {
  return (
    <svg
      className={className}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`,
      }}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color}>
        <ellipse cx="36" cy="26" rx="9" ry="24" transform="rotate(-12 36 26)" />
        <ellipse cx="64" cy="26" rx="9" ry="24" transform="rotate(12 64 26)" />
        <circle cx="50" cy="60" r="24" />
        <ellipse cx="50" cy="94" rx="30" ry="20" />
        <circle cx="76" cy="92" r="7" />
      </g>
    </svg>
  );
}

export function FlowersBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <Flower
        className="absolute -left-6 -top-6"
        size={180}
        opacity={0.35}
        petalColor="#f9c9dd"
        centerColor="#f18db0"
      />
      <Flower
        className="absolute right-10 top-16"
        size={120}
        opacity={0.3}
        petalColor="#fbdce9"
        centerColor="#f4a9c4"
        rotate={20}
      />
      <Flower
        className="absolute left-1/4 top-1/3"
        size={90}
        opacity={0.25}
        petalColor="#fde6ef"
        centerColor="#f6b8cf"
        rotate={-15}
      />
      <Flower
        className="absolute right-1/4 top-1/4"
        size={70}
        opacity={0.2}
        petalColor="#f9c9dd"
        centerColor="#f18db0"
        rotate={45}
      />
      <Flower
        className="absolute -left-8 bottom-24"
        size={120}
        opacity={0.3}
        petalColor="#fbdce9"
        centerColor="#f4a9c4"
        rotate={10}
      />
      <Flower
        className="absolute -right-10 bottom-10"
        size={150}
        opacity={0.3}
        petalColor="#f9c9dd"
        centerColor="#f18db0"
        rotate={-8}
      />
      <Flower
        className="absolute left-1/2 bottom-1/4"
        size={78}
        opacity={0.22}
        petalColor="#fde6ef"
        centerColor="#f6b8cf"
        rotate={30}
      />
      <Flower
        className="absolute left-2/3 top-1/2"
        size={50}
        opacity={0.2}
        petalColor="#fbdce9"
        centerColor="#f4a9c4"
        rotate={60}
      />

      <Bunny
        className="absolute left-8 top-1/2"
        size={70}
        opacity={0.4}
        rotate={-5}
      />
      <Bunny
        className="absolute right-14 bottom-40"
        size={80}
        opacity={0.35}
        flip
        rotate={5}
      />
      <Bunny
        className="absolute left-1/3 bottom-10"
        size={100}
        opacity={0.3}
        rotate={-8}
      />
    </div>
  );
}
