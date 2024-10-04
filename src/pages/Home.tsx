import { VariablesContainer } from "@/components/layout/VariablesContainer";
import { NavBar } from "../components/layout/NavBar";
import { Template } from "../components/layout/Template";
import type IVariable from "@/data/models/variable";
import { useState } from "react";
import type ICard from "@/data/models/card";

export function Home() {
  // Initialize variables database
  const [varDb, setVarDb] = useState<Map<string, IVariable>>(new Map());
  const cardDb = new Map<string, ICard>();

  // Function to add a variable to varDb
  const addVariable = (newVariable: IVariable) => {
    setVarDb((prevVarDb) =>
      new Map(prevVarDb).set(newVariable.key, newVariable),
    );
  };

  // Function to remove a variable from varDb
  const removeVariable = (variableKey: string) => {
    setVarDb((prevVarDb) => {
      const newVarDb = new Map(prevVarDb);
      newVarDb.delete(variableKey);
      return newVarDb;
    });
  };

  // Function to update a variable in varDb
  const updateVariable = (variableKey: string, updatedVariable: IVariable) => {
    setVarDb((prevVarDb) =>
      new Map(prevVarDb).set(variableKey, updatedVariable),
    );
  };

  return (
    <main className="p-4 flex items-center justify-center flex-col">
      <NavBar />
      <section className="flex w-full items-center">
        <Template id="template1" name="Test" child={cardDb} variables={varDb} />
        <VariablesContainer
          varDb={varDb}
          onAddVariable={addVariable}
          onRemoveVariable={removeVariable}
          onUpdateVariable={updateVariable}
        />
      </section>
    </main>
  );
}
