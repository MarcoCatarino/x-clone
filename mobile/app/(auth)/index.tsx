import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 bg-white">
      <View className="justify-between flex-1 px-8">
        <View className="justify-center flex-1">
          {/* DEMO Image */}
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth1.png")}
              className="size-96"
              resizeMode="contain"
            />
          </View>

          {/* Container Buttons Actions */}
          <View className="flex-col gap-2">
            {/* Auth with Google */}
            <TouchableOpacity
              className="flex-row items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-full"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#4285F4" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="mr-3 size-10"
                    resizeMode="contain"
                  />
                  <Text className="text-base font-medium text-black">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Auth with Apple */}
            <TouchableOpacity
              className="flex-row items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-full"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2, //Just Android
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/apple.png")}
                    className="mr-3 size-8"
                    resizeMode="contain"
                  />
                  <Text className="text-base font-medium text-black">
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text className="px-2 mt-6 text-sm leading-4 text-center text-gray-500">
            By Siggin up, you agree to our{" "}
            <Text className="text-blue-500">Terms</Text>
            {", "}
            <Text className="text-blue-500">Privacy Policy</Text>
            {", and "}
            <Text className="text-blue-500">Cookie User</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

//TODO A: Research btn vs toouchableopacity
