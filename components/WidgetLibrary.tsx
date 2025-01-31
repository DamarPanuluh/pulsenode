import type React from "react"
import { Search } from "lucide-react"

interface Widget {
  name: string
  description: string
  icon: React.ReactNode
  capability: string
}

interface WidgetLibraryProps {
  widgets: Widget[]
}

const WidgetLibrary: React.FC<WidgetLibraryProps> = ({ widgets }) => {
  return (
    <>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Widget Library</h2>
        <p className="sidebar-subtitle">Widgets for AI capability outputs</p>
      </div>
      <div className="sidebar-search">
        <input type="text" placeholder="Search widgets..." />
        <Search className="sidebar-search-icon" size={16} />
      </div>
      <div className="masonry-grid">
        {widgets.map((widget, index) => (
          <div key={index} className="capability-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="mr-3">{widget.icon}</div>
                <h3 className="font-semibold text-sm">{widget.name}</h3>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-2">{widget.description}</p>
            <p className="text-xs text-blue-600">Capability: {widget.capability}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default WidgetLibrary

