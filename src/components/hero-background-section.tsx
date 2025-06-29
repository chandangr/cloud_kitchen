"use client";

import { motion } from "framer-motion";

interface HeroBackgroundSectionProps {
  title: string;
  titleColor: string;
  subtitleColor: string;
  subtitleText: string;
  descriptionColor: string;
  descriptionText: string;
  companyLogo: string;
  backgroundImage: string;
}

export function HeroBackgroundSection({
  title,
  titleColor,
  subtitleColor,
  subtitleText,
  descriptionColor,
  descriptionText,
  companyLogo,
  backgroundImage,
}: HeroBackgroundSectionProps) {
  return (
    <div
      className="relative h-full w-full rounded-lg overflow-hidden"
    >
      {backgroundImage && (
        <motion.img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-35 z-0"
          style={{ pointerEvents: 'none' }}
        />
      )}
      {companyLogo && (
        <div className="absolute top-4 left-4 z-20">
          <motion.img
            src={companyLogo}
            alt="Company Logo"
            className="h-16 w-auto animate-[scale_0.5s_ease-in-out] opacity-60"
          />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
        <h1
          className="text-4xl md:text-6xl font-bold mb-4 animate-[fadeIn_0.8s_ease-in-out]"
          style={{ color: titleColor }}
        >
          {title}
        </h1>
        <h2
          className="text-2xl md:text-3xl font-semibold mb-4 animate-[fadeIn_1s_ease-in-out]"
          style={{ color: subtitleColor }}
        >
          {subtitleText}
        </h2>
        <p
          className="text-lg md:text-xl max-w-2xl animate-[fadeIn_1.2s_ease-in-out]"
          style={{ color: descriptionColor }}
        >
          {descriptionText}
        </p>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 