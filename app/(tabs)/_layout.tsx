import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      tintColor="#151412"
      backgroundColor="#FBF7EC"
      indicatorColor="#F2C94C"
      rippleColor="#F2C94C33"
    >
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" androidSrc={<VectorIcon family={MaterialIcons} name="home" />} />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <Icon sf="safari.fill" androidSrc={<VectorIcon family={MaterialIcons} name="explore" />} />
        <Label>Explore</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="message">
        <Icon sf="bubble.left.fill" androidSrc={<VectorIcon family={MaterialIcons} name="chat-bubble" />} />
        <Label>Message</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="maps">
        <Icon sf="map.fill" androidSrc={<VectorIcon family={MaterialIcons} name="map" />} />
        <Label>Maps</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
