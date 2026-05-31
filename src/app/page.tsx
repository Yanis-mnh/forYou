"use client";

import FallingLeaves from "@/components/fallingLeaf/FallingLeaves";
import Card from "@/components/letter/Card";

export default function Page() {
  return (
    <>
      <FallingLeaves />
      <Card />
    </>
  );
}
/** Heart rain component 
const RainOfHearts = () => {
  const heart = () => {
    return (
      <Heart fill="currentColor" className="text-red-500 absolute top-0   " />
    );
  };
  const hearts = Array.from({ length: 20 });

  return (
    <div className="absolute w-full h-screen overflow-hidden pointer-events-none">
      {hearts.map((_, i) => {
        const duration = 8 + Math.random() * 8;
        const delay = 0;
        const startLeft = Math.random() * 100;
        return (
          <div
            key={i}
            className="absolute  motion-reduce:animate-none"
            style={{
              left: `${startLeft}%`,
              animation: `heart-fall ${duration}s ease-in-out ${delay}s`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
            onAnimationEnd={(e) => {
              e.currentTarget.remove();
            }}
          >
            {heart()}
          </div>
        );
      })}
    </div>
  );
};
export { RainOfHearts };
*/
