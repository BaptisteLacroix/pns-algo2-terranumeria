import { Card, CardHeader, CardBody } from "@heroui/react";

export const SidePanelLeft = () => {
  return (
    <div className="flex flex-col overflow-y-auto h-screen w-1/6 shadow-[rgba(0,0,15,0.2)_4px_0px_0px_0px]">
      <div className="flex flex-col h-full">
        <Card className="rounded-none h-full">
          <CardHeader className="flex gap-3">Logo TerraNumerica</CardHeader>
          <CardBody>
            <h1>Documentation</h1>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
