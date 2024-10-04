import type IVariable from "@/data/models/variable";
import { useEffect, useRef } from "react";

interface IEditorProps {
  text: string;
  onChangeText: (text: string) => void;
  editStatus: boolean;
  variables: Array<IVariable>;
  maxChars?: number;
}

export const Editor = ({
  text,
  onChangeText,
  editStatus,
  variables,
  maxChars = 250,
}: IEditorProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const mirroredDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current && mirroredDivRef.current) {
      // Synchronize the scroll position
      mirroredDivRef.current.scrollTop = textAreaRef.current.scrollTop;
      mirroredDivRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  }, [text]);

  const handleScroll = () => {
    if (textAreaRef.current && mirroredDivRef.current) {
      mirroredDivRef.current.scrollTop = textAreaRef.current.scrollTop;
      mirroredDivRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText(e.target.value);
  };

  const renderTextWithVariables = (text: string) => {
    if (!text) return "";

    return text.replace(/{(\w+)}/g, (match, p1) => {
      const variable = variables.find((variable) => variable.key === p1);

      if (variable) {
        return `<span class="font-sans p-0.5 px-1 transition-all text-secondary rounded ${editStatus ? "bg-primary-light" : "bg-primary"}">${variable.key}</span>`;
      }
      return match;
    });
  };

  const renderTextWithVariablesSpan = (text: string) => {
    if (!text) return "";

    return text.replace(/{(\w+)}/g, (match, p1) => {
      const variable = variables.find((variable) => variable.key === p1);
      
      if (variable) {
        return `<span class="font-sans p-0.5 px-1 transition-all text-secondary rounded ${editStatus ? "bg-primary-light" : "bg-primary"}">${variable.value}</span>`;
      }
      return match;
    });
  };

  return (
    <div className="relative min-h-[100px] max-h-[100px] w-full">
      {editStatus ? (
        <>
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={handleTextChange}
            maxLength={maxChars}
            placeholder="Type here..."
            className="font-sans absolute top-0 resize-none p-2 bg-primary w-full rounded flex-1 caret-neutral-300 text-transparent h-[100px] max-h-full break-all overflow-wrap inline-block focus:bg-primary outline-none transition-all"
            onScroll={handleScroll}
          />
          <div
            ref={mirroredDivRef}
            className="font-sans absolute top-0 p-2 text-neutral-300 pointer-events-none whitespace-pre-wrap break-words w-full h-[100px] min-w-0 overflow-hidden break-all overflow-wrap inline-block"
            dangerouslySetInnerHTML={{
              __html: renderTextWithVariables(text),
            }}
          />
        </>
      ) : (
        <p
          className={`font-sans min-w-0 text-wrap break-words overflow-hidden break-all overflow-wrap inline-block p-2 h-[100px] flex-1 max-h-full ${text ? "text-neutral-300" : "text-neutral-400"}`}
          dangerouslySetInnerHTML={{
            __html: text ? renderTextWithVariablesSpan(text) : "Type here...",
          }}
        />
      )}
    </div>
  );
};
