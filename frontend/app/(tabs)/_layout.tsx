import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddExpense/index"
        options={{
          title: 'Expense',
          tabBarIcon: ({ color }) => <IconSymbol name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Account/index"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.crop.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
