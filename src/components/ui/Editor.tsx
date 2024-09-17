import { useState, useEffect, useRef } from "react";

interface IEditorProps {
  text: string;
  onChangeText: (text: string) => void;
  editStatus: boolean;
  variables: { [key: string]: string };
  maxChars?: number;
}

export const Editor = ({
  text,
  onChangeText,
  editStatus,
  variables,
  maxChars = 350
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
      if (variables[p1]) {
        return `<span class="font-sans p-1 transition-all text-secondary rounded ${editStatus ? "bg-primary-light" : "bg-primary"}">${p1}</span>`;
      }
      return match;
    });
  };

  const renderTextWithVariablesSpan = (text: string) => {
    if (!text) return "";

    return text.replace(/{(\w+)}/g, (match, p1) => {
      if (variables[p1]) {
        return `<span class="font-sans p-1 transition-all text-secondary rounded ${editStatus ? "bg-primary-light" : "bg-primary"}">${variables[p1]}</span>`;
      }
      return match;
    });
  };

  return (
    <div className="relative h-48">
      {editStatus ? (
        <>
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={handleTextChange}
            maxLength={maxChars}
            placeholder="Type here..."
            className="font-sans absolute top-0 resize-none p-2 bg-primary w-full rounded flex-1 caret-neutral-300 text-transparent h-[24dvh] overflow-hidden focus:bg-primary outline-none transition-all"
            onScroll={handleScroll}
          />
          <div
            ref={mirroredDivRef}
            className="font-sans absolute top-0 p-2 text-neutral-300 overflow-auto whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: renderTextWithVariables(text)
            }}
          />
        </>
      ) : (
        <p
          className={`font-sans text-justify text-wrap p-2 h-[24dvh] ${text ? "text-neutral-300" : "text-neutral-400"}`}
          dangerouslySetInnerHTML={{
            __html: text
              ? renderTextWithVariablesSpan(text)
              : "Type here..."
          }}
        />
      )}
    </div>
  );
};
