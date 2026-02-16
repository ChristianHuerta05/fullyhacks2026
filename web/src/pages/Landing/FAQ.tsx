import { useState } from "react";
import Anchor from "../../assets/LandingPage/FAQ/Anchor.svg";

type FAQType = {
  question: string;
  answer: string;
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
      "FullyHacks will take place from April 12th to April 13th. The hackathon will be 100% in-person.",
  },
  {
    question: "Who can participate?",
    answer:
      "US College students who are 18 or above with a valid student email. We welcome people of all backgrounds and experience levels.",
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
    question: "I have no experience at all, can I still participate?",
    answer:
      "Yes! We welcome people of all backgrounds and experience levels. We program workshops and bring in mentors who stick around throughout the event to help you get started!",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring a sleeping bag, laptop, chargers, snacks and drinks, hygiene items, and anything else you might need for a 24-hour event.",
  },
  {
    question: "When are applications due?",
    answer: "Applications are due by 11:59 PM (PDT) on March 31, 2025.",
  },
  {
    question: "When will I know my application status?",
    answer:
      "All applications will be reviewed on a rolling basis until March 31st, you can check application status in your user portal.",
  },
];

export function FAQ() {
  const [openedFAQ, setOpenedFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 w-full relative mt-5 gap-12 ">
      <h2 className="justify-start text-sky-200 xl:text-9xl md:text-7xl text-[56px] font-normal font-nemo lowercase">
        {" "}
        FAQ
      </h2>
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
      className="flex justify-between items-start gap-4 py-4 px-5 sm:px-8 w-full rounded-2xl sm:rounded-[30px] border-2 sm:border-[5px] border-white text-left cursor-pointer hover:bg-white/10 transition-colors duration-200 "
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
