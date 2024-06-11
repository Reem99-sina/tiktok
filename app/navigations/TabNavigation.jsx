
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '@/app/Screens/SearchScreen/index';
import AddScreen from '@/app/Screens/AddScreen/index';
import ProfileScreen from '@/app/Screens/ProfileScreen/index';
import Icon from "react-native-vector-icons/FontAwesome"
import Home from "@/app/Screens/HomeScreen/index"
import React from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import {AddStack} from "@/app/navigations/AddScreenNavigation"
import HomeScreenNavigation from "@/app/navigations/HomeScreenNavigation"
const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator 
     screenOptions={{tabBarActiveTintColor:Colors.light.text,headerShown:false}}>
      <Tab.Screen name="Home" component={HomeScreenNavigation} options={{
        tabBarIcon:({color,size})=><Icon name="home" size={size} color={color}/>
      }}
        />
      <Tab.Screen name="Search" component={SearchScreen}
       options={{tabBarIcon:({color,size})=><Icon name="search" size={size} color={color}/>}} 
       />
      <Tab.Screen name="Add" component={AddStack}
       options={{tabBarIcon:({color,size})=><Ionicons name="add" size={size} color={color}/>}} 
       />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{tabBarIcon:({color,size})=><AntDesign name="profile" size={size} color={color}/>}}
        />
    </Tab.Navigator>
  )
}