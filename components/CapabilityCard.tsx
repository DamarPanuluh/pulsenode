import React from "react"
import { Settings } from "lucide-react"

export interface CapabilityCardProps {
  icon: React.ReactNode
  title: string
  description: string
  hasSettings: boolean
  settingsOptions?: string[]
  enabled: boolean
  onToggle: () => void
}

const CapabilityCard: React.FC<CapabilityCardProps> = React.memo(
  ({ icon, title, description, hasSettings, settingsOptions = [], enabled, onToggle }) => {
    return (
      <div className={`capability-card ${enabled ? "bg-gradient-to-r from-blue-100 to-blue-200" : "bg-white"}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="mr-3">{icon}</div>
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={enabled} onChange={onToggle} />
            <div className={`toggle-switch ${enabled ? "bg-blue-600" : "bg-gray-200"}`} />
          </label>
        </div>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        {hasSettings && (
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-gray-700">
              <Settings size={16} />
            </button>
          </div>
        )}
      </div>
    )
  },
)

CapabilityCard.displayName = "CapabilityCard"

export default CapabilityCard

