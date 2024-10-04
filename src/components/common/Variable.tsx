import { useState } from "react";
import { Button } from "./button";

interface VariableProps {
  initialName?: string;
  initialValue?: string;
  onRemove: () => void;
  onChange: (name: string, value: string) => void;
}

export const Variable = ({ initialName = "", initialValue = "", onRemove, onChange }: VariableProps) => {
  const [name, setName] = useState(initialName);
  const [value, setValue] = useState(initialValue);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onChange(newName, value);  // Trigger the onChange with the updated name
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(name, newValue);  // Trigger the onChange with the updated value
  };

  return (
    <div className="flex w-full items-center text-sm">
      <div className="flex w-full p-2 gap-2 rounded bg-primary-accent text-neutral-400">
        <div className="border-r-neutral-400 border-r-[2px] w-full">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
            className="outline-none bg-primary-accent text-neutral-300 w-full"
          />
        </div>
        <div className="flex-1 min-w-[60%]">
          <input
            type="text"
            placeholder="value"
            value={value}
            onChange={handleValueChange}
            className="outline-none bg-primary-accent text-neutral-300 w-full"
          />
        </div>
      </div>
      <Button variant={"link"} className="text-accent" onClick={onRemove}>
        X
      </Button>
    </div>
  );
};
