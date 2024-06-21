"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DeleteButton( {id}: {id: string}) {
  const [showDelete, setShowDelete] = useState(false);
    const router = useRouter();

    function handleDelete() {
      
        fetch(`/api/ads?id=${id}`, {
            method: 'DELETE',
        }).then(() => {
                setShowDelete(false);
                router.push('/')
        })
  }

  if (showDelete) {
    return (
      <div className="bg-black/50 opacity-85 fixed inset-0 z-50 flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="mb-4">Are you sure you want to delete this ad?</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowDelete(false)}
              className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded"
            >
              No
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowDelete(true)}
      className="rounded-md border border-red-600 text-red-600 px-3 py-1 flex items-center justify-center"
    >
      <span className="text-xs">
        <DeleteIcon />
      </span>
      Delete
    </button>
  );
}
