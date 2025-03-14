import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {SidePanelLeft} from "@/components/SidePanelLeft.tsx";
import {SidePanelRight} from "@/components/SidePanelRight.tsx";
import {DialogBox} from "@/components/DialogBox.tsx";
import {Learning} from "@/pages/learning.tsx";

export const TerraNumerIA = () => {
    return (
        <Router>
            <div className="flex w-full h-screen overflow-hidden">
                <SidePanelLeft/>
                    <Routes>
                        <Route path="/" element={<DialogBox/>}/>
                        <Route path="/learning" element={<Learning/>}/>
                        <Route path="/biais" element={<Learning/>}/>
                        <Route path="/veracite" element={<Learning/>}/>
                        <Route path="/mathematiques" element={<Learning/>}/>
                        <Route path="/espace-vectoriel" element={<Learning/>}/>
                    </Routes>
                <SidePanelRight/>
            </div>
        </Router>
    );
};
