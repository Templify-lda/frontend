import { useState, useEffect} from "react";
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
    // Adicione mais variáveis conforme necessário
  });

  const maxChars = 350;

  const handleEditMode = () => {
    setEditStatus(!editStatus);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    onChangeText(id, newText);
  };

  const handleCopy = () => {
    const textWithVariables = renderTextWithVariablesSpan(text);

    // Criar um elemento temporário para converter HTML para texto puro
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = textWithVariables;

    // Copiar texto simples para o clipboard
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
        return `<span class="p-1 transition-all text-secondary rounded bg-primary">${variables[p1]}</span>`;
      }
      return match;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopyStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  return (
    <div className="p-4 bg-primary-light font-sans rounded-lg text-neutral border-none w-[540px] flex flex-col min-h-48 h-auto">
      <div className="flex items-center justify-end gap-4 mb-2">
        <button
          title="clipboard"
          type="button"
          onClick={handleCopy}
          className={`btn-x btn-x-hover-copy-${copyStatus} hover:bg-primary text-sm text-neutral-400 font-medium`}
        >
          <Clipboard />
        </button>
        <button
          title="edit"
          type="button"
          onClick={handleEditMode}
          className="btn-x btn-x-hover-edit hover:bg-primary text-sm text-neutral-400 font-medium"
        >
          <Edit />
        </button>
      </div>
      <div className="flex flex-col flex-1 h-full gap-2 justify-between">
        <Editor
          text={text}
          onChangeText={handleTextChange}
          editStatus={editStatus}
          variables={variables}
          maxChars={maxChars}
        />
        <p className="text-right w-full justify-self-end text-sm text-zinc-400">
          {!text?.length ? 0 : text.length}/{maxChars}
        </p>
      </div>
    </div>
  );
}
