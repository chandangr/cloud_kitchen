"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ThreeDCardProps {
  imageUrl: string;
  buttonText: string;
}

export function ThreeDCard({ imageUrl, buttonText }: ThreeDCardProps) {
  return (
    <motion.div
      className="relative w-full h-[300px] rounded-xl overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={imageUrl}
        alt="3D Card"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <Button className="w-full">{buttonText}</Button>
      </div>
    </motion.div>
  );
} 