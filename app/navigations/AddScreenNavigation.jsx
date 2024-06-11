import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from '../Screens/AddScreen/index';
import PreviewScreen from "../Screens/AddScreen/PreviewScreen"
const Stack = createStackNavigator();

export function AddStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="add-screen" component={AddScreen} />
      <Stack.Screen name="preview-screen" component={PreviewScreen} />

    </Stack.Navigator>
  );
}