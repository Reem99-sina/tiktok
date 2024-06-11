import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../Screens/HomeScreen/index"
import PlayList from '../Screens/HomeScreen/PlayList';
import OtherUserProfile from "../Screens/OtherUserProfile.jsx/index"
const Stack = createStackNavigator();
export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home-screen" component={Home} />
      <Stack.Screen name="play-video" component={PlayList} />
      <Stack.Screen name="other-user" component={OtherUserProfile} />

    </Stack.Navigator>
  )
}