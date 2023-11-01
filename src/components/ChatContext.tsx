import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface IContextValues {
  darkMode: boolean;
  changeMode: () => boolean;
}

interface IProvider {
  children: ReactNode;
}

export const ChatContext = createContext<IContextValues>({
  darkMode: false,
  changeMode: () => false,
});

export const useAppContext = () => {
  return useContext(ChatContext);
};

const ChatContextProvider: React.FC<IProvider> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const changeModeHandler = (): boolean => {
    setIsDarkMode((prev) => !prev);
    return isDarkMode;
  };

  const memo = useMemo<IContextValues>(
    () => ({
      darkMode: isDarkMode,
      changeMode: changeModeHandler,
    }),
    [isDarkMode, changeModeHandler]
  );

  return <ChatContext.Provider value={memo}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
