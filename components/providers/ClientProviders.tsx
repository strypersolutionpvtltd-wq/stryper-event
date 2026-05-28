"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/hooks/useModal";
import GetStartedModal from "@/components/sections/GetStartedModal";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
      {children}
      <GetStartedModal />
    </ModalProvider>
  );
};

export default ClientProviders;
