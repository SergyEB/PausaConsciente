import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="inicio" options={{ title: "Inicio" , headerShown: false }} />
      <Tabs.Screen name="pausas" options={{ title: "Pausas" , headerShown: false }} />
      <Tabs.Screen name="progreso" options={{ title: "Progreso" , headerShown: false }} />
      <Tabs.Screen name="jardin" options={{ title: "Jardín" , headerShown: false }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" , headerShown: false }} />
    </Tabs>
  );
}
