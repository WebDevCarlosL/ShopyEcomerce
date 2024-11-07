import React from "react";

const DeleteButton = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="rounded-lg bg-white p-5">
        <h2 className="text-center text-lg font-bold">
          ¿Estás seguro de que deseas eliminar la categoría?
        </h2>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onConfirm}
            className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
          >
            Sí
          </button>
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteButton;
