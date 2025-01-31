import type React from "react"
import { X } from "lucide-react"

interface SettingsPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  settingsOptions: string[]
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose, title, settingsOptions }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title} Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{option}</span>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPopup

