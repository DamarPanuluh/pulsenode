import type React from "react"

interface ConfirmDialogProps {
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog">
      <p>Are you sure you want to clear the chat?</p>
      <div>
        <button onClick={onConfirm} className="btn btn-danger">
          Yes, clear
        </button>
        <button onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmDialog

