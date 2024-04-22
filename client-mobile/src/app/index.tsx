import { useSocket } from "@/hooks/useSocket";
import { Text, View } from "react-native";
import { Socket } from "socket.io-client";

export default function App() {

  const socket = useSocket("2 D.S")

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}
