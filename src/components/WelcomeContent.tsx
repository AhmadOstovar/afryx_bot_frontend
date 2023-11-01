import React from "react";
import { logo, logoWhite } from "../utils";
import { useAppContext } from "./ChatContext";

const WelcomeContent: React.FC = () => {
  const context = useAppContext();

  return (
    <div className="w-full dark:text-gray-200 text-gray-800 text-center py-6 lg:py-12 font-poppins flex flex-col items-center gap-3 ">
      <h2 className="px-4 md:px-0 text-xl">Hi, I am AFRY X Bot. How can I help you?</h2>
      <p className="px-4 md:px-0 text-base">Ask a question below and you will receive an answer with references.</p>
      <img
        src={context.darkMode ? logoWhite : logo}
        alt="volvo"
        className="sm:w-[300px] sm:h-[300px] h-[150px] w-[150px] object-contain lg:mt-12"
      />
    </div>
  );
};

export default WelcomeContent;
