import { useState } from "react";
import Anchor from "../../assets/LandingPage/FAQ/Anchor.svg";

type FAQType = {
  question: string;
  answer: string;
};

const faqList: FAQType[] = [
  {
    question: "beans",
    answer: "beans answer",
  },
  {
    question: "beans1",
    answer: "beans answer1",
  },
  {
    question: "beans2",
    answer: "beans answer2",
  },
  {
    question: "beans3",
    answer: "beans answer3",
  },
  {
    question: "beans4",
    answer: "beans answer4",
  },
  {
    question: "beans5",
    answer: "beans answer5",
  },
  {
    question: "beans6",
    answer: "beans answer6",
  },
  {
    question: "beans7",
    answer: "beans answer7",
  },
  {
    question: "beans8",
    answer: "beans answer8",
  },
];

export function FAQ() {
  // this keeps track of which FAQ is currently open, store the index of the open FAQ and is nothing is open, it will be null
  const [openedFAQ, setOpenedFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 w-full relative mt-5 gap-12">
      <h2 className="justify-start text-sky-200 text-9xl font-normal font-nemo lowercase"> FAQ</h2>
      <div className="flex flex-col gap-6 w-full max-w-400 px-4">
        {faqList.map((faqListItem, index) => (
          <FAQDropdown
            question={faqListItem.question}
            answer={faqListItem.answer}
            idx={index}
            openedFAQ={openedFAQ}
            setOpenedFAQ={setOpenedFAQ}
          />
        ))}
      </div>
    </div>
  );
}

function FAQDropdown({
  question,
  answer,
  idx,
  openedFAQ,
  setOpenedFAQ,
}: {
  question: string;
  answer: string;
  idx: number;
  openedFAQ: number | null;
  setOpenedFAQ: (val: number | null) => void;
}) {
  // if the FAQ is already open, close it else , open this one
  const handleClick = () => {
    setOpenedFAQ(openedFAQ === idx ? null : idx);
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-between items-start gap-4 py-4 px-5 sm:px-8 w-full rounded-2xl sm:rounded-[30px] border-2 sm:border-[5px] border-white text-left cursor-pointer hover:bg-white/10 transition-colors duration-200"
    >
      <div className="flex flex-col max-w-[calc(100%-40px)]">
        {/* displays the question */}

        <p className="flex justify-start text-teal-500 text-xl sm:text-3xl md:text-5xl font-nemo wrap-break-word">
          {question}
        </p>

        {/* will only display the answer if the FAQ's index matches the openedFAQ index */}
        {openedFAQ === idx && (
          <p className="text-base sm:text-xl md:text-4xl font-bagel wrap-break-word text-left">
            {answer}
          </p>
        )}
      </div>

      {/* displays the anchor  */}
      <div className="w-10">
        <img src={Anchor} alt="Anchor" className="w-full h-auto" />
      </div>
    </button>
  );
}
