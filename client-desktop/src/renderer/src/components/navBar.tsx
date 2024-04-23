import { usePageContext } from "@renderer/contexts/page";

export function NavComponent() {
  const { setCurrentPage } = usePageContext();
  return (
    <nav>
      <button
        onClick={() => {
          setCurrentPage("start");
        }}
      >
        🏠
      </button>
      <button
        onClick={() => {
          setCurrentPage("addUnion");
        }}
      >
        ➕
      </button>
    </nav>
  );
}
