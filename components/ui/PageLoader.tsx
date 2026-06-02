"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const handleLoad = () => {
      if (isMounted) {
        setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        }, 800);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timer = setTimeout(handleLoad, 2500);
      return () => {
        isMounted = false;
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-primary-black flex flex-col items-center justify-center p-4 touch-none overscroll-none"
        >
          <div className="flex flex-col items-center max-w-sm w-full space-y-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full flex justify-center"
            >
              <div className="relative h-24 w-64 md:h-32 md:w-80">
                <Image
                  src="/images/logo.png"
                  alt="Stryper Events"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_30px_rgba(250,204,21,0.5)] mix-blend-screen"
                />
              </div>
            </motion.div>

            <div className="w-full space-y-6 flex flex-col items-center">
              <div className="w-48 md:w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-accent-yellow to-transparent"
                />
              </div>

              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-center"
              >
                <p className="text-accent-yellow/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
                  Crafting Your Moment
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PageLoader;
