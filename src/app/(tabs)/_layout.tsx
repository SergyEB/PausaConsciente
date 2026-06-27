import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Inicio" , headerShown: false }} />
      <Tabs.Screen name="pausas" options={{ title: "Pausas" }} />
      <Tabs.Screen name="progreso" options={{ title: "Progreso" }} />
      <Tabs.Screen name="jardin" options={{ title: "Jardín" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
