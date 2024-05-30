import { app } from "@renderer/App";
import { OkButton } from "@renderer/components/okButton";
import { usePageContext } from "@renderer/contexts/page";
import { Representant, Union } from "@renderer/models";
import { FormEvent, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export function Voting() {
  const [representants, setRepresentants] = useState<Representant[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);

  const [representant, setRepresentant] = useState<string>("");
  const [union, setUnion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setCurrentPage, setHeader } = usePageContext();

  const getData = async () => {
    setIsLoading(true);
    const course = localStorage.getItem("course");
    const Representants: Representant[] = await app
      .get("/representant/" + course)
      .then((Result) => Result.data);
    const Unions: Union[] = await app.get("/union").then((Result) => Result.data);
    setRepresentants(Representants);
    setUnions(Unions);
    setIsLoading(false);
  };

  const vote = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const students = parseInt(localStorage.getItem("students") || "") - 1;
    localStorage.setItem("students", `${students}`);
    if (students == 0) {
      endVotes();
    } else {
      await app.post("/vote", { representant, union });
      setUnion("");
      setRepresentant("");
      setIsLoading(false);
    }
  };

  const endVotes = () => {
    const course = localStorage.getItem("course");
    app.post("/course/" + course);
    setIsLoading(false);
    setCurrentPage("start");
    setHeader(true);
    localStorage.setItem("allVotes", JSON.stringify([]));
  };

  useEffect(() => {
    getData();
  }, []);
  return !isLoading ? (
    <div className="flex flex-col">
      <h1 className="font-bold text-center text-xl">REALIZE SEU VOTO</h1>
      <form
        className="flex justify-center items-center flex-col border rounded gap-2 p-4"
        onSubmit={vote}
      >
        <div className="flex gap-3">
          <div className="border flex flex-col justify-center">
            {representants.map((Representant) => (
              <div className="flex justify-between h-auto gap-1 p-4">
                <label htmlFor={Representant.name}>{Representant.name}</label>
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="Representant"
                  id={Representant.name}
                  key={Representant.name}
                  checked={Representant.name == representant}
                  onClick={() => {
                    setRepresentant(Representant.name);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="border flex flex-col justify-center">
            {unions.map((Union) => (
              <div className="flex justify-between items-center gap-1  p-4">
                <label htmlFor={Union.name}>{Union.name}</label>
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="union"
                  key={Union.name}
                  checked={Union.name == union}
                  onClick={() => {
                    setUnion(Union.name);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <OkButton value="VOTAR" />
      </form>
    </div>
  ) : (
    <TailSpin color="#ff0000" height={80} width={80} />
  );
}
