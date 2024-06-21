import { Icon } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  name: string;
  value: string;
  icon: React.FC;
  onClick: () => void;
  label: ReactNode;
  defaultChecked?: boolean;
};

export default function RadioLabelButton({
  name,
  value,
  icon: IconComponent,
  onClick,
  label,
  defaultChecked = false,
}: Props) {
  return (
    <label className="has-[:checked]:bg-blue-100 rounded-md p-2 flex items-center gap-2 my-0">
      <input
        onClick={() => onClick()}
        className="hidden"
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        value={value}
      />
      <span >
        <IconComponent />{" "}
      </span>
      {label}
    </label>
  );
}
