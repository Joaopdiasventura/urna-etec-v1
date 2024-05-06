import { useCallback } from "react";
import icon from "../../../../resources/icon.png";
import { usePageContext } from "@renderer/contexts/page";
const { ipcRenderer } = window.require("electron");

export function HeaderComponent(): JSX.Element {
  const { setCurrentPage, header, setHeader } = usePageContext();

  const handleCloseWindow = useCallback(() => {
    window.close();
  }, []);

  const handleMinimizeWindow = useCallback(() => {
    ipcRenderer.send("minimize-window");
  }, []);

  const handleChangeWindow = useCallback(() => {
    ipcRenderer.send("change-window");
  }, []);

  return header ? (
    <header className="bg-red-600 flex flex-row text-white items-center justify-between p-1 w-full">
      <div className="flex items-center gap-2">
        <img
          src={icon}
          alt=""
          className="w-12 cursor-pointer rounded"
          onClick={() => setCurrentPage("")}
        />
        <ul className="flex gap-4 cursor-pointer">
          <li onClick={() => setCurrentPage("startVotes")}>Iniciar Votação</li>
        </ul>
      </div>
      <div className="flex gap-2">
        <button className="text-center" onClick={handleChangeWindow}>
          🟢
        </button>
        <button className="text-center" onClick={handleMinimizeWindow}>
          🟡
        </button>
        <button className="text-center" onClick={handleCloseWindow}>
          🔴
        </button>
      </div>
    </header>
  ) : (
    <>
      <button
        onClick={() => {
          setHeader(true);
        }}
      >
        opa
      </button>
    </>
  );
}
