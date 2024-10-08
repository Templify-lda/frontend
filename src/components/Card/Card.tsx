import { useState, useEffect } from "react";
import { Clipboard } from "../Icons/Clipboard";
import { Edit } from "../Icons/Edit";
import { Editor } from "./Editor";
import type IVariable from "@/data/models/variable";

interface ICardProps {
  id: string;
  content: string;
  onChangeText: (id: string, e: string) => void;
  variables: Array<IVariable>;
}

export function Card({ id, content, onChangeText, variables }: ICardProps) {
  const [text, setText] = useState(content);
  const [copyStatus, setCopyStatus] = useState<string>("");
  const [editStatus, setEditStatus] = useState<boolean>(false);

  const maxChars = 250;

  const handleEditMode = () => {
    setEditStatus(!editStatus);
  };
  console.log("CARDS::", variables);
  const handleTextChange = (newText: string) => {
    setText(newText);
    onChangeText(id, newText);
  };

  const handleCopy = () => {
    const textWithVariables = renderTextWithVariablesSpan(text);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = textWithVariables;

    const plainText = tempDiv.textContent || "";

    navigator.clipboard
      .writeText(plainText)
      .then(() => {
        setCopyStatus("done");
      })
      .catch((error) => {
        setCopyStatus("Failed to copy text.");
        console.error("Error copying text: ", error);
      });
  };

  const renderTextWithVariablesSpan = (text: string) => {
    if (!text) return "";

    return text.replace(/{(\w+)}/g, (match, p1) => {
      const variable = variables.find(variable => variable.key === p1);

      if (variable) {
        return `<span class="font-sans p-0.5 px-1 transition-all text-secondary rounded bg-primary">${variable.value}</span>`;
      }
      return match;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopyStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  return (
    <div className={`p-2 ${editStatus? "bg-primary border-primary-light border-solid border-2": "bg-primary-light border-none"} text-sm font-sans rounded-lg text-neutral  min-w-[440px]  w-full flex flex-col h-[200px]`}>
      {" "}
      {/* Fixed height */}
      <div className="flex items-center justify-end gap-4 p-1">
        <button
          title="clipboard"
          type="button"
          onClick={handleCopy}
          className={`font-sans btn-x btn-x-hover-copy-${copyStatus} hover:bg-primary text-sm text-neutral-400 font-medium`}
        >
          <Clipboard />
        </button>
        <button
          title="edit"
          type="button"
          onClick={handleEditMode}
          className="font-sans btn-x btn-x-hover-edit hover:bg-primary text-sm text-neutral-400 font-medium"
        >
          <Edit />
        </button>
      </div>
      <div className="flex flex-col flex-1 h-full gap-1 justify-between overflow-y-auto">
        {" "}
        {/* Enable scroll if needed */}
        <Editor
          text={text}
          onChangeText={handleTextChange}
          editStatus={editStatus}
          variables={variables}
          maxChars={maxChars}
        />
        <p className="font-sans text-right w-full justify-self-end text-xs text-zinc-400">
          {!text?.length ? 0 : text.length}/{maxChars}
        </p>
      </div>
    </div>
  );
}
