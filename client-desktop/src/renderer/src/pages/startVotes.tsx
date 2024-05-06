import { ChangeEvent, useEffect, useState } from "react";
import { app } from "../App";
import { Course } from "@renderer/models";
import { InputComponent } from "@renderer/components/input";
import { OkButton } from "@renderer/components/okButton";
import { usePageContext } from "@renderer/contexts/page";

export function StartVotes() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<string>("");
  const [students, setStudents] = useState<string>("0");

  const { setCurrentPage, setHeader } = usePageContext();

  const getCourses = async () => {
    try {
      const result = await app.get("/course/not").then((res) => res.data);
      setCourses(result);
      setCourse(result[0] ? result[0].name : "");
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const changeCourse = (event: ChangeEvent<HTMLSelectElement>) => {
    setCourse(event.target.value);
  };

  const changeStudents = (event: ChangeEvent<HTMLInputElement>) => {
    setStudents(event.target.value);
  };

  const start = () => {
    setHeader(false);
    localStorage.setItem("course", course);
    localStorage.setItem("students", students);
    setCurrentPage("voting");
  };

  useEffect(() => {
    getCourses();
  }, []);

  return courses.length > 0 ? (
    <div className="flex flex-col gap-1">
      <h1>Iniciar votação</h1>
      <form onSubmit={start} className="flex flex-col gap-1.5">
        <select
          value={course}
          className="bg-transparent border focus:outline-none focus:ring-0 p-1 rounded cursor-pointer"
          onChange={changeCourse}
        >
          {courses.map((courseItem) => (
            <option
              className="focus:outline-none focus:ring-0"
              value={courseItem.name}
              key={courseItem.name}
            >
              {courseItem.name}
            </option>
          ))}
        </select>
        <InputComponent
          type="number"
          placeholder="QUANTIDADE DE ALUNOS"
          onChange={changeStudents}
          required
        />
        <OkButton value="COMEÇAR" />
      </form>
    </div>
  ) : (
    <h1>Todos os votos já foram realizados</h1>
  );
}
