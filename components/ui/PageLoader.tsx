"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-primary-black flex flex-col items-center justify-center p-4"
        >
          <div className="flex flex-col items-center max-w-sm w-full space-y-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full flex justify-center"
            >
              <img
                src="/images/logo.png"
                alt="Stryper Events"
                className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_30px_rgba(250,204,21,0.5)] mix-blend-screen"
              />
            </motion.div>

            <div className="w-full space-y-6 flex flex-col items-center">
              <div className="w-48 md:w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.8,
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
