"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useGetStartedModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useGetStartedModal must be used within a ModalProvider");
  }
  return context;
};
