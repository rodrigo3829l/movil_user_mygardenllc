import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "movil_user_mygardenllc",
  webDir: "dist",
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_launcher_background",
      iconColor: "#488AFF",
      sound: "beep.wav",
      vibrate: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
