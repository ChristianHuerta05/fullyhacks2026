import { useState } from "react";

type FAQType = {
  question: string;
  answer: string;
  answerLink?: { text: string; url: string };
};

const faqList: FAQType[] = [
  {
    question: "What is FullyHacks?",
    answer:
      "FullyHacks is a FREE 24-hour hackathon hosted by ACM at California State University Fullerton. Join us for a day of innovation, collaboration, and creative problem-solving as we bring together students from various backgrounds to tackle real-world challenges using cutting-edge technology.",
  },
  {
    question: "When is FullyHacks?",
    answer:
      "FullyHacks will take place from April 18th to April 19th. The hackathon will be 100% in-person.",
  },
  {
    question: "Will there be travel reimbursements?",
    answer: "Unfortunately, we will not be able to provide travel reimbursements.",
  },
  {
    question: "What can I build?",
    answer:
      "Anything your heart desires! Web, mobile, gaming, VR... You name it, we will support it. We offer different tracks to inspire you and help you build your project.",
  },
  {
    question: "Do I need to have a team?",
    answer:
      "Not at all! You can go solo, come with a team (no more than four people), or join some teams at FullyHacks. We will also have team building activities to help you find the right teammates!",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring a sleeping bag, laptop, chargers, snacks and drinks, hygiene items, and anything else you might need for a 24-hour event.",
  },
  {
    question: "What is the MLH Code of Conduct?",
    answer:
      "FullyHacks is an MLH Member Event, and all participants must adhere to the Major League Hacking (MLH) Code of Conduct, which ensures an inclusive and safe environment for everyone. You can find the full text of the MLH Code of Conduct here:",
    answerLink: {
      text: "MLH Code of Conduct",
      url: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
    },
  },
];

function FAQDropdown({
  question,
  answer,
  answerLink,
  idx,
  openedFAQ,
  setOpenedFAQ,
}: {
  question: string;
  answer: string;
  answerLink?: { text: string; url: string };
  idx: number;
  openedFAQ: number | null;
  setOpenedFAQ: (val: number | null) => void;
}) {
  const isOpen = openedFAQ === idx;
  const handleClick = () => {
    setOpenedFAQ(isOpen ? null : idx);
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-between items-center gap-3 py-3 px-4 sm:px-6 w-full rounded-xl border-3 border-white text-left cursor-pointer hover:brightness-125 transition-all duration-200"
      style={{ backgroundColor: isOpen ? "#27084F" : "#1A0D33" }}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-white text-sm sm:text-lg md:text-xl font-baloo font-semibold">
          {question}
        </p>

        {isOpen && (
          <p className="text-white/80 text-xs sm:text-sm md:text-base font-coheadline">
            {answer}{" "}
            {answerLink && (
              <a
                href={answerLink.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#BEF3FC] underline hover:text-white transition-colors duration-200"
              >
                {answerLink.text}
              </a>
            )}
          </p>
        )}
      </div>

      <span className="text-white text-xl sm:text-2xl shrink-0 select-none">
        {isOpen ? "−" : "+"}
      </span>
    </button>
  );
}

export function FAQ() {
  const [openedFAQ, setOpenedFAQ] = useState<number | null>(null);

  return (
    <div className="w-full px-4 md:px-10 lg:px-16 pt-10 md:pt-16 pb-20 flex flex-col gap-8">
      <h1 className="font-nemo text-4xl md:text-6xl lg:text-7xl text-[#BEF3FC]">faq</h1>

      <div className="flex flex-col gap-3 w-full">
        {faqList.map((faqListItem, index) => (
          <FAQDropdown
            key={index}
            question={faqListItem.question}
            answer={faqListItem.answer}
            answerLink={faqListItem.answerLink}
            idx={index}
            openedFAQ={openedFAQ}
            setOpenedFAQ={setOpenedFAQ}
          />
        ))}
      </div>
    </div>
  );
}
