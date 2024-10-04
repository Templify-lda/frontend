import { useState, useCallback } from "react";
import { Card } from "../Card/Card";
import { Button } from "../common/button";
import { SearchFile } from "../Icons/SearchFile";
import type ICard from "@/data/models/card";
import type ITemplate from "@/data/models/template";
import type IVariable from "@/data/models/variable";

interface TemplateProps extends ITemplate {
  variables: Map<string, IVariable>;
}

export const Template = ({ variables }: TemplateProps) => {
  const [counter, setCounter] = useState(0);
  const [cardList, setCardList] = useState<ICard[]>([]);

  const vars: IVariable[] = [];

  variables.forEach((v, k) => {
    v.id = k;
    vars.push(v);
  });
  console.log(variables);
  console.log(vars);
  const AddCard = useCallback(() => {
    const newCardInfo: ICard = {
      id: `${counter}`,
      content: "",
      tag: "",
      parent_id: "", // Initial content can be empty or a default value
    };
    setCounter((prev) => prev + 1);
    setCardList((prev) => [...prev, newCardInfo]);
  }, [counter]);

  const handleContentChange = (id: string, content: string) => {
    setCardList((prev) =>
      prev.map((card) => (card.id === id ? { ...card, content } : card)),
    );
  };

  return (
    <div className="w-full flex flex-col gap-2 p-4 h-[90dvh]">
      <div className="flex w-full p-1 justify-between items-center">
        <h1
          className="text-4xl font-bold font-heading text-neutral-400 focus:bg-primary-light hover:text-neutral-200 hover:bg-primary-light focus:text-neutral-50 transition-all outline-none p-4 rounded-lg"
          contentEditable="plaintext-only"
          onBlur={(e) => console.log("File name:", e.currentTarget.textContent)}
        >
          File Name
        </h1>
        <div className="flex p-1 gap-2">
          <Button variant={"ghost"} className="text-accent font-semibold">
            Delete
          </Button>
          <Button
            variant={"secondary"}
            onClick={AddCard}
            className="font-semibold"
          >
            + Add Card
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full h-auto gap-4 items-center p-2 overflow-y-scroll scrollbar-thin scrollbar-webkit">
        {cardList.length > 0 ? (
          cardList.map((card) => (
            <Card
              key={card.id}
              id={card.id.toString()}
              content={card.content}
              onChangeText={(content) => handleContentChange(card.id, content)}
              variables={vars}
            />
          ))
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-10">
            <SearchFile/>
            <p className="text-neutral-500 text-xl text-center">
              There are no card yet
            </p>
            <Button variant={"secondary"} onClick={AddCard}>
              + Add Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
