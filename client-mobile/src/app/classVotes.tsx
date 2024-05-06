import React, { ChangeEvent, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { HeaderComponent } from "../components/header";
import { SelectComponent } from "../components/select";

const representatives = [
  { name: "John Doe", votes: 120 },
  { name: "Jane Smith", votes: 150 },
];

const slates = [
  { name: "Chapa A", votes: 200 },
  { name: "Chapa B", votes: 180 },
];

export default function ClassVotes() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [representativeWinner, setRepresentativeWinner] = useState(
    representatives[0]
  );
  const [slateWinner, setSlateWinner] = useState(slates[0]);

  useEffect(() => {
    const unionWithMostVotes = slates.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
    setSlateWinner(unionWithMostVotes);

    const representativeWithMostVotes = representatives.reduce(
      (prev, current) => (prev.votes > current.votes ? prev : current)
    );
    setRepresentativeWinner(representativeWithMostVotes);
  }, []);

  return (
    <View>
      <HeaderComponent />
      <SelectComponent
        onValueChange={(event: ChangeEvent) => {
          setSelectedCourse("opa");
          alert(selectedCourse);
        }}
      />
      <View className="justify-center mx-4">
        <Text className="mt-5 mb-2 text-lg font-bold self-start">
          Representatives
        </Text>
        {representatives.map((rep, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center w-11/12 mb-2"
          >
            <Text className="text-base">{rep.name}</Text>
            <Text className="text-base font-bold">{rep.votes}</Text>
          </View>
        ))}

        <Text className="mt-5 mb-2 text-lg font-bold self-start">Slates</Text>
        {slates.map((slate, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center w-11/12 mb-2"
          >
            <Text className="text-base">{slate.name}</Text>
            <Text className="text-base font-bold">{slate.votes}</Text>
          </View>
        ))}
      </View>
      <View className="mx-4">
        <Text className="mt-5 mb-2 text-xl font-black self-start">
          Winners:
        </Text>
        <View>
          <Text className="mt-5 mb-2 text-lg font-bold self-start">
            Representative
          </Text>
          <View className="flex-row justify-between items-center w-11/12 mb-2">
            <Text className="text-base">{representativeWinner.name}</Text>
            <Text className="text-base font-bold">
              {representativeWinner.votes}
            </Text>
          </View>
        </View>
        <View>
          <Text className="mt-5 mb-2 text-lg font-bold self-start">Slates</Text>
          <View className="flex-row justify-between items-center w-11/12 mb-2">
            <Text className="text-base">{slateWinner.name}</Text>
            <Text className="text-base font-bold">{slateWinner.votes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
