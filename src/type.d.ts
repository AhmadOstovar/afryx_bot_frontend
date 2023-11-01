interface IChatMessage {
  role: roles;
  content: string;
  refs?: string[];
}

interface IChatRequest {
  history: IChatMessage[];
  role: roles;
  prompt: string;
  sendStaticResponse?: false;
}

interface IBotResponse {
  role: roles;
  response: IResponse;
}
interface IResponse {
  answer: string;
  refs: string[];
}

interface IRoles {
  user: string;
  assistant: string;
  system: string;
}
