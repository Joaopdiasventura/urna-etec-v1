import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export function SelectComponent(props: ComponentProps<any>) {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const getData = async () => {
    const url = `https://urna-etec.onrender.com/course`;
    console.log(url);

    try {
      const response = await axios.get(url);
      const result = await response.data;
      console.log(result);

      setCourses(result);
      if (result.length > 0) {
        setSelectedCourse(result[0].name);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Picker
      selectedValue={selectedCourse}
      className="w-10 h-2"
      {...props}
    >
      {courses.map((course) => (
        <Picker.Item
          key={course.name}
          label={course.name}
          value={course.name}
        />
      ))}
    </Picker>
  );
}
