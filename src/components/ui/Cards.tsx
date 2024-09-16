import { useState, useEffect, useRef } from "react";

interface ICardsProps {
  id: string;
  content: string;
  onChangeText: (id: string, e: string) => void;
  onDelete: (id: string) => void;
}

export function Cards({ id, content, onChangeText, onDelete }: ICardsProps) {
  const [text, setText] = useState(content);
  const [copyStatus, setCopyStatus] = useState<string>("Copy");
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const [variables, setVariables] = useState<{ [key: string]: string }>({
    userName: "John Doe",
    passageiro: "Maria Luisa"
    // Adicione mais variáveis conforme necessário
  });
  const textAreaRef = useRef(null);
  const maxChars = 350;

  const handleEditMode = () => {
    setEditStatus(!editStatus);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChangeText(id, e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(renderTextWithVariables(text))
      .then(() => {
        setCopyStatus("Copied");
      })
      .catch((error) => {
        setCopyStatus("Failed to copy text.");
        console.error("Error copying text: ", error);
      });
  };

  // Função para substituir placeholders pelos valores das variáveis
  const renderTextWithVariables = (text: string) => {
    return text?.replace(/{{(\w+)}}/g, (match, p1) => variables[p1] || match);
  };

  const renderTextWithVariablesSpan = (text: string) => {
    if (!text) return "";

    return text.replace(/{{(\w+)}}/g, (match, p1) => {
      if (variables[p1]) {
        return `<span class="p-1 bg-secondary transition-all text-neutral rounded hover:bg-secondary-light">${variables[p1]}</span>`;
      }
      return match;
    });
  };

  useEffect(() => {
    if (editStatus && textAreaRef.current) {
      textAreaRef.current.focus(); // Focus on the text area when entering edit mode
    }
  }, [editStatus]);

  useEffect(() => {
    const timer = setTimeout(() => setCopyStatus("Copy"), 3000);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  return (
    <div className="p-4 bg-primary-light rounded-lg text-neutral border-none w-[500px] flex flex-col min-h-48 h-auto">
      <div className="flex items-center justify-end gap-4 mb-2">
        <button type="button" onClick={handleCopy}>
          {copyStatus}
        </button>
        <button type="button" onClick={handleEditMode}>
          Edit
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <div className="max-w-full h-full">
          {editStatus ? (
            <textarea
              ref={textAreaRef}
              value={text}
              onChange={handleTextChange}
              maxLength={maxChars}
              placeholder="Type here..."
              className="resize-none p-4 bg-primary w-full flex-1 h-full overflow-hidden focus:bg-primary outline-none transition-all"
              disabled={!editStatus} // Disable text area if not in edit mode
            />
          ) : (
            <p
              className="text-justify p-4 text-neutral h-auto"
              dangerouslySetInnerHTML={{
                __html: renderTextWithVariablesSpan(text),
              }} // Renderiza o texto formatado com spans
            />
          )}
        </div>
        <p className="text-right">
          {!text?.length ? 0 : text.length}/{maxChars}
        </p>
      </div>
    </div>
  );
}
