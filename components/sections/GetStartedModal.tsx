"use client";

import GetStartedForm from "@/components/ui/GetStartedForm";
import Modal from "@/components/ui/Modal";
import { useGetStartedModal } from "@/hooks/useModal";

const GetStartedModal = () => {
  const { isOpen, onClose } = useGetStartedModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Plan Your Event">
      <GetStartedForm onSuccess={onClose} />
    </Modal>
  );
};

export default GetStartedModal;
