import React, { useEffect, useRef } from "react";
import TypeWriter from "./TypeWriter";
import AFRY_LOGO from "../assets/AFRY_Logotype_Symbol.png";
import AFRY_LOGO_WHITE from "../assets/AFRY_Logotype_Symbol_White.png";

import PERSON from "../assets/person_Black.svg";
import PERSON_WHITE from "../assets/person_White.svg";

import ReactMarkdown from "react-markdown";
import { renderRefs } from "../utils";
import { useAppContext } from "./ChatContext";
import remarkGfm from "remark-gfm";

interface IHistory {
  history: IChatMessage[];
  isLoading: boolean;
}

const History: React.FC<IHistory> = ({ history, isLoading }) => {
  const divRef: any = useRef(null);
  const context = useAppContext();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
    }
  });

  const loadingComponent = () => {
    return (
      <div className=" w-full flex justify-center">
        <div className="w-full max-w-[600px] flex flex-row items-start justify-start gap-8 py-4 ">
          <div className="w-[24px] h-[24px] ">
            <img src={context.darkMode ? AFRY_LOGO_WHITE : AFRY_LOGO} alt="id" className="min-w-[24px] min-h[24px]" />
          </div>
          <p className="dark:text-gray-200 text-gray-800 blinking-cursor font-poppins " />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col h-full ">
      {history.map((chatMessage: IChatMessage, i) => (
        <div
          key={chatMessage.content + Math.random().toString()}
          className={`${
            chatMessage.role === "user" ? "bg-white dark:bg-neutral-700" : "bg-main dark:bg-neutral-800"
          } w-full flex justify-center px-4 md:px-0`}
        >
          <div className="w-full max-w-[600px] flex flex-row items-start justify-start gap-8 py-4 ">
            <div className="w-[24px] h-[24px] ">
              {chatMessage.role === "assistant" ? (
                <img
                  src={context.darkMode ? AFRY_LOGO_WHITE : AFRY_LOGO}
                  alt="Bot"
                  className="min-w-[24px] min-h-[24px]"
                />
              ) : (
                <img src={context.darkMode ? PERSON_WHITE : PERSON} alt="you" className="min-w-[24px] min-h-[24px]" />
              )}
            </div>
            {chatMessage.role === "assistant" && history.length === i + 1 ? (
              <TypeWriter botResponse={chatMessage.content} refs={chatMessage.refs} divRef={divRef} />
            ) : (
              <div className="flex flex-col">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="font-poppins whitespace-pre-wrap dark:text-gray-200 text-gray-800"
                >
                  {chatMessage.content}
                </ReactMarkdown>
                {chatMessage.refs && chatMessage.refs.length !== 0 && renderRefs(chatMessage.refs)}
              </div>
            )}
          </div>
        </div>
      ))}
      {isLoading && loadingComponent()}
      <div ref={divRef} id="scrollRef" />
    </div>
  );
};

export default History;
