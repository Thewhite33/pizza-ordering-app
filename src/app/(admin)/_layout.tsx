import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/src/hooks/useColorScheme.web';
import { Colors } from '@/src/constants/Colors';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor:'gainsboro',
        headerShown: true,
        tabBarActiveBackgroundColor:Colors.light.tint,
        tabBarStyle:{
          backgroundColor:Colors.light.tint
        }
      }}>
        <Tabs.Screen name='index' options={{href:null}}/>
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='cafe-sharp' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='bag-sharp' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
