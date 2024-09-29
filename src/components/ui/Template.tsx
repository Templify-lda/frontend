import { useEffect, useState, useCallback } from "react";
import { Cards } from "./Cards";
import { Button } from "./button";
import { SearchFile } from "./Icons/SearchFile";

type CardInfo = {
  id: number;
  content: string;
};

export const Template = () => {
  const [counter, setCounter] = useState(0);
  const [cardList, setCardList] = useState<CardInfo[]>([]);

  const AddCard = useCallback(() => {
    const newCardInfo: CardInfo = {
      id: counter,
      content: "", // Initial content can be empty or a default value
    };
    setCounter((prev) => prev + 1);
    setCardList((prev) => [...prev, newCardInfo]);
  }, [counter]);

  const handleContentChange = (id: number, content: string) => {
    setCardList((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, content } : card
      )
    );
  };

  const handleDeleteCard = (id: number) => {
    setCardList((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-2 p-4 h-[90dvh]">
      <div className="flex w-full p-1 justify-between items-center">
        <h1
          className="text-4xl font-bold font-heading text-neutral-300 focus:bg-primary-light outline-none p-4 rounded-lg"
          contentEditable="plaintext-only"
          onBlur={(e) => console.log("File name:", e.currentTarget.textContent)}
        >
          File Name
        </h1>
        <div className="flex p-1 gap-2">
          <Button variant={"ghost"} className="text-accent font-semibold">
            Delete
          </Button>
          <Button variant={"secondary"} onClick={AddCard} className="font-semibold">
            + Add Card
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full h-auto gap-4 items-center p-2 overflow-y-scroll scrollbar-thin scrollbar-webkit">
        {cardList.length > 0 ? (
          cardList.map((card) => (
            <Cards
              key={card.id}
              id={card.id.toString()}
              content={card.content}
              onContentChange={(content) => handleContentChange(card.id, content)}
              onDelete={() => handleDeleteCard(card.id)}
            />
          ))
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-10">
            <SearchFile />
            <p className="text-neutral-500 text-xl text-center">There are no cards yet</p>
            <Button variant={"secondary"} onClick={AddCard}>
              + Add Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
