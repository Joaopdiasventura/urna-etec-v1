import { usePageContext } from "@renderer/contexts/page";
import { Start } from "./start";
import { StartVotes } from "./startVotes";
import { Voting } from "./voting";

export function CurrentPage() {
  const { currentPage } = usePageContext();

  const setPage = () => {
    switch (currentPage) {
      case "startVotes":
        return <StartVotes />;
      case "voting":
        return <Voting />;
      default:
        return <Start />;
    }
  };

  return <div className="flex h-dvh justify-center items-center">{setPage()}</div>;
}
