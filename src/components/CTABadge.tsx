"use client";

import { HiBolt } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  text: string;
  href?: string;
  subtitle?: string;
};

export const CTABadge = ({
  text = "Sprint past the competition",
  href = "#",
  subtitle,
}: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.a
        href={href}
        className="relative inline-flex items-center rounded-full overflow-hidden cursor-pointer"
        style={{
          padding: '0.5rem',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          backgroundColor: hovered ? '#00afec' : 'transparent',
          borderColor: hovered ? '#00afec' : 'rgba(255,255,255,0.3)',
          boxShadow: hovered ? '0 0 60px 20px rgba(0,175,236,0.4)' : '0 0 0 0 rgba(0,175,236,0)',
        }}
        transition={{
          duration: 0.4,
          delay: hovered ? 0.3 : 0,
        }}
      >
        {/* Sliding circle */}
        <motion.div
          className="absolute top-1/2 flex items-center justify-center rounded-full"
          style={{
            width: 'clamp(4rem, 8vw, 6rem)',
            height: 'clamp(4rem, 8vw, 6rem)',
            transform: 'translateY(-50%)',
          }}
          animate={{
            left: hovered ? 'calc(100% - clamp(4rem, 8vw, 6rem) - 0.5rem)' : '0.5rem',
            backgroundColor: hovered ? '#fff' : '#00afec',
          }}
          transition={{
            left: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            backgroundColor: { duration: 0.3, delay: hovered ? 0.3 : 0 },
          }}
        >
          <HiBolt
            className="text-black"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          />
        </motion.div>

        {/* Text */}
        <motion.span
          className="relative z-10"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            paddingLeft: 'clamp(5.5rem, 11vw, 8.5rem)',
            paddingRight: 'clamp(2rem, 4vw, 3rem)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
          }}
          animate={{
            color: hovered ? '#000' : '#fff',
          }}
          transition={{
            duration: 0.3,
            delay: hovered ? 0.3 : 0,
          }}
        >
          {text}
        </motion.span>
      </motion.a>

      {subtitle && (
        <p className="text-white/70 text-lg md:text-xl">{subtitle}</p>
      )}
    </div>
  );
};

export default CTABadge;
