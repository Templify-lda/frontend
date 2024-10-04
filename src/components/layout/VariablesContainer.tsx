import { useState } from "react";
import { Button } from "../common/button";
import { Variable } from "../common/Variable";
import type IVariable from "@/data/models/variable";

interface VariablesContainerProps {
  varDb: Map<string, IVariable>;
  onAddVariable: (newVariable: IVariable) => void;
  onRemoveVariable: (key: string) => void;
  onUpdateVariable: (key: string, updatedVariable: IVariable) => void;
}

export const VariablesContainer = ({
  varDb,
  onAddVariable,
  onRemoveVariable,
  onUpdateVariable,
}: VariablesContainerProps) => {

  const [localVariables, setLocalVariables] = useState<IVariable[]>(
    Array.from(varDb.values()),
  );

  // Function to handle adding a new variable
  const addVariable = () => {
    const newVariable: IVariable = {
      id: Date.now().toString(), // unique id based on timestamp
      key: "",
      value: "",
      parent_id: "template1", // example parent_id, change as needed
    };
    onAddVariable(newVariable); // Call the provided function to add the variable
    setLocalVariables((prev) => [...prev, newVariable]); // Update local state
  };

  // Function to handle removing a variable
  const removeVariable = (id: string) => {
    onRemoveVariable(id); // Call the provided function to remove the variable
    setLocalVariables((prev) => prev.filter((variable) => variable.id !== id)); // Update local state
  };

  // Function to handle variable changes
  const handleVariableChange = (id: string, key: string, value: string) => {
    setLocalVariables((prev) =>
      prev.map((variable) =>
        variable.id === id ? { ...variable, key, value } : variable,
      ),
    ); // Update local state without saving to DB
  };

  // Function to save the variables
  const saveVariables = () => {
    localVariables.map((variable) => {
      onUpdateVariable(variable.key, variable); // Call the provided function to update the variable in the DB
    });
    console.log("Variables saved:", localVariables); // Optional: Log the saved variables
  };

  return (
    <aside className="flex flex-col bg-primary-light min-w-[350px] p-4 gap-8 rounded-lg h-[80dvh]">
      <div className="w-full flex justify-between text-neutral-100 font-semibold text-lg">
        <h2>My Variables</h2>
        <Button variant={"secondary"} onClick={addVariable}>
          Add Variable
        </Button>
      </div>

      <div className="w-full flex-1 flex gap-2 flex-col items-center">
        {localVariables.map((variable) => (
          <Variable
            key={variable.id}
            initialName={variable.key}
            initialValue={variable.value}
            onChange={(name, value) =>
              handleVariableChange(variable.id, name, value)
            } // Track local changes
            onRemove={() => removeVariable(variable.id)}
          />
        ))}
      </div>

      <div className="flex w-full justify-between items-center">
        <Button variant={"link"} className="text-neutral-400">
          Close
        </Button>
        <Button variant={"secondary"} onClick={saveVariables}>
          {/* Save changes only on click */}
          Save
        </Button>
      </div>
    </aside>
  );
};
