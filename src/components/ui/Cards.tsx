import { useState, useEffect } from "react";
import { Clipboard } from "./Icons/Clipboard";
import { Edit } from "./Icons/Edit";
import { Editor } from "./Editor";

interface ICardsProps {
  id: string;
  content: string;
  onChangeText: (id: string, e: string) => void;
  onDelete: (id: string) => void;
}

export function Cards({ id, content, onChangeText, onDelete }: ICardsProps) {
  const [text, setText] = useState(content);
  const [copyStatus, setCopyStatus] = useState<string>("");
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [variables, setVariables] = useState<{ [key: string]: string }>({
    userName: "John Doe",
    passageiro: "Maria Luisa",
    // Add more variables as needed
  });

  const maxChars = 250;

  const handleEditMode = () => {
    setEditStatus(!editStatus);
  };

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
      if (variables[p1]) {
        return `<span class="font-sans p-0.5 px-1 transition-all text-secondary rounded bg-primary">${variables[p1]}</span>`;
      }
      return match;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopyStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  return (
    <div className="p-2 bg-primary-light text-sm font-sans rounded-lg text-neutral border-none min-w-[440px]  w-full flex flex-col h-[200px]"> {/* Fixed height */}
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
      <div className="flex flex-col flex-1 h-full gap-1 justify-between overflow-y-auto"> {/* Enable scroll if needed */}
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
