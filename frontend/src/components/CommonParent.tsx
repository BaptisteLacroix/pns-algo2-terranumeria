import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidePanelLeft } from "@/components/SidePanelLeft.tsx";
import { SidePanelRight } from "@/components/SidePanelRight.tsx";
import { DialogBox } from "@/components/DialogBox.tsx";
import { Learning } from "@/pages/learning.tsx";
import { History } from "@/pages/history.tsx";
import {
  resetWithProfil,
  getProfil,
} from "../components/services/BackendService.ts";
import { useRef } from "react";

export const CommonParent = () => {
  const dialogRef = useRef<{ resetChatComponent: () => void } | null>(null);

  const resetChatWithProfil = (profil: string) => {
    resetWithProfil(profil);
    dialogRef.current?.resetChatComponent();
  };

  const callResetChat = () => {
    resetWithProfil(getProfil());
    dialogRef.current?.resetChatComponent();
  };

  return (
    <Router>
      <div className="flex w-full h-screen overflow-hidden">
        <SidePanelLeft callResetChat={callResetChat} />
        <Routes>
          <Route path="/" element={<DialogBox ref={dialogRef}/>} />
          <Route path="/history" element={<History />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/biais" element={<Learning />} />
          <Route path="/veracite" element={<Learning />} />
          <Route path="/mathematiques" element={<Learning />} />
          <Route path="/espace-vectoriel" element={<Learning />} />
        </Routes>
        <SidePanelRight changeProfil={resetChatWithProfil} />
      </div>
    </Router>
  );
};
