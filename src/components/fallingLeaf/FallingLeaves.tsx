import FallingLeaf from "./FallingLeaf";

const FallingLeaves = () => {
  const leaves = Array.from({ length: 8 });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {leaves.map((_, i) => {
        const duration = 8 + Math.random() * 8;
        const delay = Math.random() * -20;
        const startLeft = Math.random() * 100;

        return (
          <div
            key={i}
            className="absolute motion-reduce:animate-none"
            style={{
              left: `${startLeft}%`,
              animation: `leaf-fall ${duration}s ease-in-out ${delay}s infinite`,
              background: `linear-gradient(145deg, ${
                ["#ffb347", "#f4a261", "#ff7f50", "#e85a00"][
                  Math.floor(Math.random() * 4)
                ]
              } 0%, #e85a00 100%)`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
            onAnimationEnd={(e) => {
              e.currentTarget.remove();
            }}
          >
            <FallingLeaf />
          </div>
        );
      })}
    </div>
  );
};

export default FallingLeaves;
