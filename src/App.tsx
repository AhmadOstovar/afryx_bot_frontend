import { useEffect, useRef, useState } from "react";
import { useAppContext } from "./components/ChatContext";
import Form from "./components/Form";
import Header from "./components/Header";
import History from "./components/History";
import WelcomeContent from "./components/WelcomeContent";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useRef<IChatMessage[]>([]);
  const context = useAppContext();

  useEffect(() => {
    const isStoredDarkMode = localStorage.getItem("mode");

    if (isStoredDarkMode === null) {
      localStorage.setItem("mode", JSON.stringify(false));
      return;
    }

    const storedModeIsDark = JSON.parse(isStoredDarkMode);
    if (storedModeIsDark && !context.darkMode) {
      context.changeMode();
    }
  }, []);

  const changeMode = () => {
    context.changeMode();

    localStorage.setItem("mode", JSON.stringify(!context.darkMode));
  };

  return (
    <div className={` ${context.darkMode && "dark"} w-screen h-screen `}>
      <div className=" bg-main dark:bg-neutral-800 w-full h-full pb-6 md:pb-0">
        <Header changeModeHandler={changeMode} />
        {history.current.length === 0 ? (
          <div className=" w-full flex flex-col h-[65%] md:h-[70%] xl:h-[80%] max-h-[80vh] ">
            <WelcomeContent />
          </div>
        ) : (
          <div className=" w-full flex flex-col h-[65%] md:h-[70%] xl:h-[80%] max-h-[80vh] scroll-smooth overflow-y-auto ">
            <History history={history.current} isLoading={isLoading} />
          </div>
        )}
        <Form history={history.current} isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </div>
  );
}

export default App;
