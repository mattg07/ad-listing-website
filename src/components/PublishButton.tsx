import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function PublishButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
      className={
        (pending ? "bg-gray-400" : "bg-blue-600") +
        " mt-2 text-white px-4 py-2"
      }
      >
        {pending && <span>Saving...</span>}
        {!pending && <span>{children}</span>}
      </button>
    </>
  );
}
