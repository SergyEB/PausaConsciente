import { Tabs } from "expo-router";
import {
  ChartColumn,
  Clock3,
  House,
  Sprout,
  User,
} from "lucide-react-native";

const TAB_ICONS = {
  inicio: House,
  pausas: Clock3,
  progreso: ChartColumn,
  jardin: Sprout,
  perfil: User,
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const Icon = TAB_ICONS[route.name as keyof typeof TAB_ICONS];
          return <Icon color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="inicio" options={{ title: "Inicio" }} />
      <Tabs.Screen name="pausas" options={{ title: "Pausas" }} />
      <Tabs.Screen name="progreso" options={{ title: "Progreso" }} />
      <Tabs.Screen name="jardin" options={{ title: "Jardin" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
