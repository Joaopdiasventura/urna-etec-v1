import { Text, View, Image } from "react-native";
import { Link } from "expo-router";

export function HeaderComponent() {
  return (
    <>
      <View className="h-8 bg-red-700"></View>
      <View className="h-14 bg-red-700 flex-row items-center p-2 gap-2">
        <Link className="m-1 h-16 rounded items-center" href={"/"}>
          <Image
            source={require("../../assets/images/icon.png")}
            className="m-1 w-10 h-10 rounded items-center"
          />
        </Link>
        <Text className="text-white">Acompanhar Votação</Text>
        <Link href={"/trackVotes"} className="text-white">
          Ver Resultado
        </Link>
        <Link href={"/classVotes"} className="text-white">
          Ver Sala
        </Link>
      </View>
    </>
  );
}
