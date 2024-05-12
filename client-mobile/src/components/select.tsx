import React from "react";
import { Picker } from "@react-native-picker/picker";

interface SelectComponentProps {
  courses: string[];
  currentCourse: string;
  [key: string]: any;
}

export function SelectComponent({ courses, currentCourse, ...props }: SelectComponentProps) {

  return (
    <Picker
      selectedValue={currentCourse}
      style={{ width: 40, height: 8 }} 
      {...props}
    >
      {courses.map((course, index) => (
        <Picker.Item
          key={course}
          label={course}
          value={course}
        />
      ))}
    </Picker>
  );
}
