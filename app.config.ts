import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  icon: "./src/assets/images/khooi-icon.png",
  splash: {
    // image: "https://i.ibb.co/TK18kCJ/kreme-ico.png",
    image: "./src/assets/images/khooi-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
});
