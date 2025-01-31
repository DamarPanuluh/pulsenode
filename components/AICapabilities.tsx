import type React from "react"
import { Search } from "lucide-react"
import CapabilityCard, { type CapabilityCardProps } from "./CapabilityCard"

interface AICapabilitiesProps {
  capabilities: CapabilityCardProps[]
  onCapabilityToggle: (index: number) => void
}

const AICapabilities: React.FC<AICapabilitiesProps> = ({ capabilities, onCapabilityToggle }) => {
  return (
    <>
      <div className="sidebar-header">
        <h2 className="sidebar-title">AI Capabilities</h2>
        <p className="sidebar-subtitle">Available tools and features</p>
      </div>
      <div className="sidebar-search">
        <input type="text" placeholder="Search capabilities..." />
        <Search className="sidebar-search-icon" size={16} />
      </div>
      <div className="masonry-grid">
        {capabilities.map((capability, index) => (
          <CapabilityCard key={capability.title} {...capability} onToggle={() => onCapabilityToggle(index)} />
        ))}
      </div>
    </>
  )
}

export default AICapabilities

