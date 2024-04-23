import { createContext, FC, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react'

type PageContextType = {
  currentPage: string
  setCurrentPage: Dispatch<SetStateAction<string>>
}

const PageContext = createContext<PageContextType>({
  currentPage: 'start',
  setCurrentPage: () => {}
})

export const usePageContext = () => {
  return useContext(PageContext)
}

export const PageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('start')

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>
  )
}
