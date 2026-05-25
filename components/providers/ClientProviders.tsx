"use client";

import React from "react";
import { ModalProvider } from "@/hooks/useModal";
import GetStartedModal from "@/components/sections/GetStartedModal";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      {children}
      <GetStartedModal />
    </ModalProvider>
  );
};

export default ClientProviders;
