import React, { useEffect, useRef, useState } from "react";

interface ITextInputProps {
  value: IChatRequest;
  setText: any;
  id: string;
  label: string;
}

const TextInput: React.FC<ITextInputProps> = ({ value, setText, id, label }) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [taHeight, setTaHeight] = useState<number>(50);

  const onEnterPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      if (submitButton.current !== null) {
        submitButton.current.click();
      }
    }
  };

  useEffect(() => {
    if (taRef) {
      let newHeight = 0;
      if (taRef.current) {
        newHeight = taRef.current.textLength / 65;
        const height = Math.floor(newHeight) * 30 + 50;
        setTaHeight(height);
      }
    }
  }, [value]);

  return (
    <div className="relative">
      <textarea
        ref={taRef}
        id={id}
        rows={10}
        style={{ maxHeight: "200px", minHeight: "50px", height: taHeight }}
        className=" scrollbar block resize-none shadow-[0_0_10px_rgba(0,0,0,0.10)] border-none font-poppins pl-2.5 pr-10 py-3 w-full text-base text-black rounded-lg border-[1px] border-black appearance-none focus:outline-none focus:ring-0 focus:border-primaryGreen peer bg-white dark:bg-neutral-200"
        placeholder=" "
        value={value.prompt}
        onKeyDown={(e) => {
          onEnterPressed(e);
        }}
        onChange={(e) => {
          const newValue: IChatRequest = {
            history: value.history,
            sendStaticResponse: value.sendStaticResponse,
            role: value.role,
            prompt: e.target.value,
          };
          setText(newValue);
        }}
      />

      <label
        htmlFor={id}
        className="absolute text-base font-poppins duration-300 transform -translate-y-4 scale-100 -top-2 z-10 origin-[0] bg-none px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:-top-2 peer-focus:bg-inherit peer-focus:text-slate-800 peer-focus:left-0 peer-focus:pl-1 dark:peer-focus:text-neutral-200 dark:peer-placeholder-shown:text-slate-700 dark:text-neutral-200 text-slate-700 peer-focus:scale-110 peer-focus:-translate-y-4"
      >
        {label}
      </label>
      <button
        ref={submitButton}
        disabled={value.prompt === ""}
        type="submit"
        className="group absolute bottom-[9px] right-2 w-[30px] py-1 origin-[0] z-10 cursor-pointer disabled:scale-100 disabled:cursor-default hover:scale-110 transition-all duration-150"
      >
        <svg
          height="24"
          viewBox="0 96 960 960"
          width="24"
          className="group-disabled:fill-slate-400 group-hover:fill-blue-600"
        >
          <path d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z" />
        </svg>
      </button>
    </div>
  );
};

export default TextInput;
