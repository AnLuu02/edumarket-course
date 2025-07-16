import { Modal, ScrollArea } from "@mantine/core";
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  openModal: (content: React.ReactNode, header?: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useGlobalModal = () => useContext(ModalContext)!;

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [header, setHeader] = useState<React.ReactNode>(null);

  const openModal = (node: React.ReactNode, header?: React.ReactNode) => {
    setContent(node);
    setOpened(true);
    setHeader(header);
  };

  const closeModal = () => setOpened(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        opened={opened}
        onClose={closeModal}
        size="xl"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
        title={header}
        className="z-[9999]"
      >
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
