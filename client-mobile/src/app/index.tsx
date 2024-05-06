import { useSocket } from "@/src/hooks/useSocket";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { HeaderComponent } from "../components/header";

export default function App() {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("voteUpdate", (msg: any) => {
        console.log(msg);
      });
    }
  }, [socket]);

  return (
    <View>
      <HeaderComponent />
      <View className="h-screen justify-center items-center">
        <Text>Bem vindo a Urna da Etec</Text>
      </View>
    </View>
  );
}
