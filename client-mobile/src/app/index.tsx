import { useSocket } from "@/src/hooks/useSocket";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function App() {
  const socket = useSocket("2° D.S");

  useEffect(() => {
    if (socket) {
      socket.on("voteUpdate", (msg: any) => {
        console.log(msg);
      });
    }
  }, [socket]);

  return (
    <View>
      <Text>Hello  jerk</Text>
    </View>
  );
}
