import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from "react";

type PageContextType = {
  currentPage: string;
  header: boolean;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  setHeader: Dispatch<SetStateAction<boolean>>;
};

const PageContext = createContext<PageContextType>({
  currentPage: "start",
  setCurrentPage: () => {},
  header: true,
  setHeader: () => {}
});

export const usePageContext = () => {
  return useContext(PageContext);
};

export const PageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>("start");
  const [header, setHeader] = useState<boolean>(true);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, header, setHeader }}>
      {children}
    </PageContext.Provider>
  );
};
