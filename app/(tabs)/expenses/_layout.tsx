import { Stack } from 'expo-router';

export default function ExpensesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daily" />
      <Stack.Screen name="credit" />
      <Stack.Screen name="special" />
    </Stack>
  );
}