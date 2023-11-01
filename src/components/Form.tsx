import React, { useState } from "react";
import { EMPTY_REQUEST, EMPTY_RESPONSE, roles, sendPrompt } from "../utils";
import TextInput from "./TextInput";

interface IForm {
  history: IChatMessage[];
  isLoading: boolean;
  setIsLoading: any;
}

const Form: React.FC<IForm> = ({ history, setIsLoading }) => {
  const [prevRequest, setPrevRequest] = useState<IChatRequest>(EMPTY_REQUEST);
  const [botRequest, setBotRequest] = useState<IChatRequest>(EMPTY_REQUEST);
  const [error, setError] = useState("");

  const fetchData = async (request: IChatRequest, isFirstTry: boolean) => {
    setIsLoading(true);
    const myMessage: IChatMessage = { role: request.role, content: request.prompt };
    let hist = history.map((message: IChatMessage) => {
      return {
        role: message.role,
        content: message.content,
      };
    });
    const myRequest: IChatRequest = {
      history: hist,
      prompt: request.prompt,
      role: request.role,
    };
    const rawResponse = sendPrompt(myRequest);

    if (isFirstTry) {
      history.push(myMessage);
    }

    let isSuccess = false;

    rawResponse.then(async (response) => {
      if (response.status !== 200) {
        setError("The server is currently overloaded with other requests. Sorry about that!");
      } else {
        const answer:string = await response.text();
        
        const myResponse: IChatMessage = { role: roles.assistant, content: answer, refs: [] };

        history.push(myResponse);
        setIsLoading(false);
        isSuccess = true;
      }
    });
    return isSuccess;
  };

  return (
    <>
      {error !== "" && (
        <div className="flex flex-col items-center font-poppins font-medium text-red-600 dark:text-red-500">
          {error}
          <button
            className=" shadow-lg bg-blue-700 text-neutral-200 hover:scale-110 duration-200 transition-all w-fit px-4 py-2 rounded-md mt-2"
            onClick={() => {
              fetchData(prevRequest, false);
              setError("");
            }}
          >
            Resend request
          </button>
        </div>
      )}
      <form
        className="w-full flex my-8 justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(botRequest, true);
          setPrevRequest(botRequest);
          const resetValue: IChatRequest = {
            history: botRequest.history,
            sendStaticResponse: botRequest.sendStaticResponse,
            role: botRequest.role,
            prompt: "",
          };
          setBotRequest(resetValue);
        }}
      >
        <div className=" max-w-[600px] w-full mx-4 md:mx-0">
          <TextInput id="prompt" label="Ask me anything" setText={setBotRequest} value={botRequest} />
        </div>
      </form>
    </>
  );
};

export default Form;
