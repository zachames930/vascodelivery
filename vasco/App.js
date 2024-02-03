import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/redux';
import { AuthProvider, useAuth } from './screens/auth/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

import Login from './screens/auth/Login';
import CreateOrganization from "./screens/auth/CreateOrganization";
import CalendarComponent from './screens/calendar/Calendar';
import Settings from './screens/settings/Settings';
import DeliveryHistory from "./screens/feed/DeliveryHistory";
import PhotoBackup from "./screens/new/PhotoBackup";
import EquipmentDetail from "./screens/calendar/EquipmentDetail";
import ComingSoonScreen from "./screens/settings/ComingSoon";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CalendarStack = createStackNavigator();

function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen name="Calendar" component={CalendarComponent} />
      <CalendarStack.Screen name="EquipmentDetail" component={EquipmentDetail} />
      <CalendarStack.Screen name="PhotoBackup" component={PhotoBackup} />
      <CalendarStack.Screen name="Settings" component={Settings} />
    </CalendarStack.Navigator>
  );
}

function createComingSoonScreen(name) {
  return function ComingSoonWrapper(props) {
    return <ComingSoonScreen {...props} route={{ ...props.route, params: { name } }} />;
  };
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Icon names based on the route
          if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'home' : 'home-outline';
          }

          // Return the Ionicons component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFC300',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false, // You can use tabBarOptions for other options but tabBarShowLabel goes here for RN v5+
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={createComingSoonScreen('Delivery Feed')} options={{ headerShown: false }} />
      <Tab.Screen name="Analytics" component={createComingSoonScreen('Analytics')} options={{ headerShown: false }} />
      <Tab.Screen name="Projects" component={createComingSoonScreen('Projects')} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

function AppNavigator() {
  const { authToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authToken ? (
        <>
          <Stack.Screen name='MainTab' component={BottomTabNavigator} />
          <Stack.Screen name='PhotoBackup' component={PhotoBackup} />
          <Stack.Screen name="Settings" component={Settings} />
        </>
      ) : (
        <>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='CreateOrganization' component={CreateOrganization} />
        </>
      )}
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default App
