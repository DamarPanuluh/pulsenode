import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AICapabilities from "./AICapabilities"
import WidgetLibrary from "./WidgetLibrary"
import type { CapabilityCardProps, Widget } from "../types"

interface LeftSidebarProps {
  capabilities: CapabilityCardProps[]
  widgets: Widget[]
  onCapabilityToggle: (index: number) => void
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ capabilities, widgets, onCapabilityToggle }) => {
  return (
    <div className="sidebar-content flex flex-col h-full">
      <Tabs defaultValue="capabilities" className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <TabsContent value="capabilities" className="mt-0 h-full">
            <AICapabilities capabilities={capabilities} onCapabilityToggle={onCapabilityToggle} />
          </TabsContent>
          <TabsContent value="widgets" className="mt-0 h-full">
            <WidgetLibrary widgets={widgets} />
          </TabsContent>
        </div>

        <TabsList className="grid w-full grid-cols-2 h-[40px]">
          <TabsTrigger value="capabilities">AI Capabilities</TabsTrigger>
          <TabsTrigger value="widgets">Widget Library</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default LeftSidebar

