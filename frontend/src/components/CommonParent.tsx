import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {SidePanelLeft} from "@/components/SidePanelLeft.tsx";
import {SidePanelRight} from "@/components/SidePanelRight.tsx";
import {DialogBox} from "@/components/DialogBox.tsx";
import {Learning} from "@/pages/learning.tsx";
import { History } from "@/pages/history.tsx";

import {
    resetWithProfil,
    getProfil,
} from "../components/services/BackendService.ts";
import {useState} from "react";

export const CommonParent = () => {
    const [showTokenBorders, setShowTokenBorders] = useState(false);
    const [showTokenPopovers, setShowTokenPopovers] = useState(false);
    const [resetDialog, setResetDialog] = useState(false);

    const resetChatWithProfile = (profil: string) => {
        resetWithProfil(profil);
        setResetDialog(prev => !prev); // Toggle the state to trigger reset
    };

    const callResetChat = () => {
        resetWithProfil(getProfil());
        setResetDialog(prev => !prev); // Toggle the state to trigger reset
    };

    return (
        <Router>
            <div className="flex w-full h-screen overflow-hidden">
                <SidePanelLeft callResetChat={callResetChat}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <DialogBox
                                    showTokenBorders={showTokenBorders}
                                    showTokenPopovers={showTokenPopovers}
                                    resetDialog={resetDialog}
                                />
                                <SidePanelRight
                                    setShowTokenBorders={setShowTokenBorders}
                                    setShowTokenPopovers={setShowTokenPopovers}
                                    showTokenBorders={showTokenBorders}
                                    showTokenPopovers={showTokenPopovers}
                                    changeProfile={resetChatWithProfile}
                                />
                            </>
                        }
                    />
                    <Route path="/learning" element={<Learning/>}/>
                    <Route path="/biais" element={<Learning/>}/>
                    <Route path="/veracite" element={<Learning/>}/>
                    <Route path="/mathematiques" element={<Learning/>}/>
                    <Route path="/espace-vectoriel" element={<Learning/>}/>
                    <Route path="/history" element={<History/>}/>
                </Routes>
            </div>
        </Router>
    );
};
