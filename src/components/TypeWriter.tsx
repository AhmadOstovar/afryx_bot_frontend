import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { renderRefs } from "../utils";

interface ITypeWriter {
  botResponse: string;
  refs?: string[];
  divRef: any;
}

const TypeWriter: React.FC<ITypeWriter> = ({ botResponse, refs, divRef }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  let timeout: any = null;

  useEffect(() => {
    if (botResponse === text) {
      setIsTyping(false);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (botResponse !== "") {
      setIsTyping(true);
      timeout = setTimeout(() => {
        setText(botResponse.slice(0, text.length + 1));
        divRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }, 10);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [text]);

  return (
    <div className="flex flex-col">
      <ReactMarkdown
        linkTarget={"_blank"}
        remarkPlugins={[remarkGfm]}
        className={`test dark:text-gray-200 text-gray-800 font-poppins whitespace-pre-wrap`}
      >
        {text}
      </ReactMarkdown>
      {!isTyping && botResponse === text && refs && refs.length !== 0 && renderRefs(refs)}
    </div>
  );
};

export default TypeWriter;
