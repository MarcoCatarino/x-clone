import { Text } from "react-native";
import { useUserSync } from "@/hooks/useUserSync";
import { SafeAreaView } from "react-native-safe-area-context";

import SignOutButton from "@/components/SignOutButton";

const HomeScreen = () => {
  useUserSync();

  return (
    <SafeAreaView className="flex-1">
      <Text>HomeScreen</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};
export default HomeScreen;
