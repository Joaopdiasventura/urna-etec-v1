import { usePageContext } from "@renderer/contexts/page";
import { AddRepresentant } from "./addRepresentant";
import { AddUnion } from "./addUnion";
import { Start } from "./start";

export function CurrentPage() {
  const { currentPage } = usePageContext();

  const setPage = () => {
    switch (currentPage) {
      case "addUnion":
        return <AddUnion />;
      case "addRepresentant":
        return <AddRepresentant />;
      default:
        return <Start />;
    }
  };

  return <div className="flex h-dvh justify-center items-center">{setPage()}</div>;
}
