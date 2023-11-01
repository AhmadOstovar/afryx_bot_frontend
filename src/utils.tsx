import logoBlack from "./assets/AFRY_Logotype_Symbol.png";
import logoWhite from "./assets/AFRY_Logotype_Symbol_White.png";

export { logoBlack as logo, logoWhite };
export const roles: IRoles = {
  assistant: "assistant",
  system: "system",
  user: "user",
};

export const sendPrompt = (botRequest: IChatRequest) => {

  const url = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_LOCAL_URL;

  const req = url + '?' + new URLSearchParams([['question',botRequest.prompt]]);
  
  console.log(JSON.stringify(req));

  return fetch(req, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
};

export const renderRefs = (refs: string[]) => {
  return (
    <ul className="flex flex-col font-poppins mt-2 rounded-md italic text-gray-800 dark:text-gray-200">
      {refs.map((ref: string, i: number) => (
        <li key={ref + i} className="px-4 py-2 ">
          <a target={"_blank"} href={ref}>
            {ref}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const EMPTY_REQUEST: IChatRequest = { role: roles.user, history: [], prompt: "" };
export const EMPTY_RESPONSE: IBotResponse = { role: roles.assistant, response: { answer: "", refs: [] } };
