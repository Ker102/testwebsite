"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Shape {
  src: string;
  size: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  blur?: boolean;
  hideOnMobile?: boolean;
}

const shapes: Shape[] = [
  {
    src: "/assets/shapes/flow1.png",
    size: 240,
    left: "20%",
    top: "25%",
    delay: 0,
    duration: 20,
    hideOnMobile: false,
  },
  {
    src: "/assets/shapes/flow2.png",
    size: 280,
    left: "75%",
    top: "20%",
    delay: 2,
    duration: 25,
    hideOnMobile: false,
  },
  {
    src: "/assets/shapes/flow3.png",
    size: 200,
    left: "25%",
    top: "65%",
    delay: 1,
    duration: 22,
    hideOnMobile: true,
  },
  {
    src: "/assets/shapes/shape8.png",
    size: 260,
    left: "70%",
    top: "70%",
    delay: 3,
    duration: 23,
    hideOnMobile: true,
  },
  {
    src: "/assets/shapes/shape3.png",
    size: 180,
    left: "50%",
    top: "15%",
    delay: 1.5,
    duration: 18,
    blur: true,
    hideOnMobile: true,
  },
];

export default function FloatingShapes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.hideOnMobile ? "hidden md:block" : ""}`}
          style={{
            left: shape.left,
            top: shape.top,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              animation: `float ${shape.duration}s ease-in-out infinite`,
              animationDelay: `${shape.delay}s`,
              filter: shape.blur ? "blur(2px)" : "none",
            }}
          >
            <Image
              src={shape.src}
              alt="Abstract 3D shape"
              fill
              className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
              priority={index < 2}
              draggable={false}
            />
          </div>
        </div>
      ))}

      {/* Add custom keyframes to global styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-25px) translateX(15px);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
          }
          75% {
            transform: translateY(-35px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}

