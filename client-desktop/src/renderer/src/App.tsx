import { HeaderComponent } from "./components/header";
import { NavComponent } from "./components/navBar";
import { PageProvider } from "./contexts/page";
import { CurrentPage } from "./pages";

export function App(): JSX.Element {
  return (
    <PageProvider>
      <div className="h-screen w-screen flex flex-col text-white bg-black">
        <div className="h-1/7">
          <HeaderComponent />
          <NavComponent />
        </div>
        <CurrentPage />
      </div>
    </PageProvider>
  );
}
