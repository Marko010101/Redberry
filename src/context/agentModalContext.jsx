import { createContext, useContext, useEffect, useState } from "react";
import ModalAddAgent from "../components/ModalAddAgent.jsx";

const AgentModalContext = createContext();

export const AgentModalProvider = ({ children }) => {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  function handleToggleAgentModal() {
    setIsAgentModalOpen((prev) => !prev);
  }

  useEffect(() => {
    if (isAgentModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isAgentModalOpen]);

  return (
    <AgentModalContext.Provider value={{ handleToggleAgentModal }}>
      {isAgentModalOpen && (
        <ModalAddAgent
          isAgentModalOpen={isAgentModalOpen}
          handleToggleAgentModal={handleToggleAgentModal}
        />
      )}
      {children}
    </AgentModalContext.Provider>
  );
};

export const useAgentModal = () => useContext(AgentModalContext);
