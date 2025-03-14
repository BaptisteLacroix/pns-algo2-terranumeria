import { SidePanelLeft } from "@/components/SidePanelLeft.tsx";
import { SidePanelRight } from "@/components/SidePanelRight.tsx";
import { DialogBox } from "@/components/DialogBox.tsx";

export const TerraNumerIA = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SidePanelLeft />
      <DialogBox />
      <SidePanelRight />
    </div>
  );
};
