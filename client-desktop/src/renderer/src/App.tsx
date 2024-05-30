import axios from "axios";
import { HeaderComponent } from "./components/header";
import { PageProvider } from "./contexts/page";
import { CurrentPage } from "./pages";

export const app = axios.create({ baseURL: "https://urna-etec.onrender.com" });

export function App(): JSX.Element {
  return (
    <PageProvider>
      <div className="h-screen w-screen flex flex-col font-mono">
        <div className="h-1/7">
          <HeaderComponent />
        </div>
        <CurrentPage />
      </div>
    </PageProvider>
  );
}
