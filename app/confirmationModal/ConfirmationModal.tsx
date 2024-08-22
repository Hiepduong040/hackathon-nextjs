
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Xác nhận xóa sản phẩm</h3>
        <p className="mb-4">Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-red-600"
          >
            Xóa
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
