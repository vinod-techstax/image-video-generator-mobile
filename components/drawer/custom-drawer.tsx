import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { 
  Home, 
  Image as GalleryIcon, 
  DollarSign, 
  Mail, 
  Info, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react-native';
import { navigationItems } from '@/constants/drawer-navigation-items';

type DrawerItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  isActive?: boolean;
  showChevron?: boolean;
};



const DrawerItem = ({ icon, label, onPress, isActive, showChevron = true }: DrawerItemProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center py-3 px-4 rounded-lg mb-1
        ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}
        active:bg-gray-100 dark:active:bg-gray-800`}
      activeOpacity={0.7}
    >
      <View className="w-6 items-center mr-3">
        {React.cloneElement(icon as React.ReactElement, {
          color: isActive ? '#6366f1' : '#64748b',
          size: 22,
          className: isActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
        })}
      </View>
      <Text className={`flex-1 text-base
        ${isActive ? 'text-indigo-600 dark:text-indigo-300 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </Text>
      {showChevron && (
        <ChevronRight 
          size={18} 
          className="text-gray-400 dark:text-gray-500" 
        />
      )}
    </TouchableOpacity>
  );
};

export function CustomDrawer(props: any) {
  const navigation = useNavigation();
  const currentRoute = props.state.routeNames[props.state.index];
  
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: null,
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* User Profile Section */}
        <View className="px-6 py-6 ">
          <View className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 items-center justify-center mb-4">
            {userProfile.avatar ? (
              <Image
                source={{ uri: userProfile.avatar }}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <User size={28} className="text-indigo-500 dark:text-indigo-400" />
            )}
          </View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            {userProfile.name}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {userProfile.email}
          </Text>
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-200 dark:bg-gray-700 mx-1 my-2" />

        {/* Drawer Items */}
        <View className="px-2 py-2">
          {navigationItems.map((item) => (
            <DrawerItem
              key={item.route}
              icon={<item.icon/>}
              label={item.label}
              onPress={() => navigation.navigate(item.route as never)}
              isActive={currentRoute === item.route}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section with Logout */}
      <View className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <DrawerItem
          icon={<LogOut />}
          label="Logout"
          onPress={() => console.log('Logout pressed')}
          showChevron={false}
        />
      </View>
    </View>
  );
}






// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { DrawerContentScrollView } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
// import { 
//   Home, 
//   Image as GalleryIcon, 
//   DollarSign, 
//   Mail, 
//   Info, 
//   LogOut,
//   ChevronRight,
//   User
// } from 'lucide-react-native';

// type DrawerItemProps = {
//   icon: React.ReactNode;
//   label: string;
//   onPress: () => void;
//   isActive?: boolean;
//   showChevron?: boolean;
// };

// const DrawerItem = ({ icon, label, onPress, isActive, showChevron = true }: DrawerItemProps) => {
//   return (
//     <TouchableOpacity 
//       onPress={onPress}
//       style={[
//         styles.drawerItem,
//         isActive && styles.activeDrawerItem
//       ]}
//     >
//       <View style={styles.iconContainer}>
//         {React.cloneElement(icon as React.ReactElement, {
//           color: isActive ? '#6366f1' : '#64748b',
//           size: 22
//         })}
//       </View>
//       <Text style={[
//         styles.drawerItemText,
//         isActive && styles.activeDrawerItemText
//       ]}>
//         {label}
//       </Text>
//       {showChevron && (
//         <ChevronRight size={18} color="#94a3b8" style={styles.chevronIcon} />
//       )}
//     </TouchableOpacity>
//   );
// };

// export function CustomDrawer(props: any) {
//   const navigation = useNavigation();
//   const currentRoute = props.state.routeNames[props.state.index];
  
//   const userProfile = {
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     avatar: null,
//   };

//   return (
//     <View style={styles.container}>
//       <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
//         {/* User Profile Section */}
//         <View style={styles.profileContainer}>
//           <View style={styles.avatarContainer}>
//             {userProfile.avatar ? (
//               <Image
//                 source={{ uri: userProfile.avatar }}
//                 style={styles.avatar}
//               />
//             ) : (
//               <User size={32} color="#6366f1" />
//             )}
//           </View>
//           <Text style={styles.userName}>{userProfile.name}</Text>
//           <Text style={styles.userEmail}>{userProfile.email}</Text>
//         </View>

//         {/* Divider */}
//         <View style={styles.divider} />

//         {/* Drawer Items */}
//         <View style={styles.menuContainer}>
//           <DrawerItem
//             icon={<Home />}
//             label="Home"
//             onPress={() => navigation.navigate('Home')}
//             isActive={currentRoute === 'Home'}
//           />
//           <DrawerItem
//             icon={<GalleryIcon />}
//             label="Gallery"
//             onPress={() => navigation.navigate('Gallery')}
//             isActive={currentRoute === 'Gallery'}
//           />
//           <DrawerItem
//             icon={<DollarSign />}
//             label="Pricing"
//             onPress={() => navigation.navigate('Pricing')}
//             isActive={currentRoute === 'Pricing'}
//           />
//           <DrawerItem
//             icon={<Mail />}
//             label="Contact"
//             onPress={() => navigation.navigate('Contact')}
//             isActive={currentRoute === 'Contact'}
//           />
//           <DrawerItem
//             icon={<Info />}
//             label="About Us"
//             onPress={() => navigation.navigate('AboutUs')}
//             isActive={currentRoute === 'AboutUs'}
//           />
//         </View>
//       </DrawerContentScrollView>

//       {/* Bottom Section with Logout */}
//       <View style={styles.footer}>
//         <DrawerItem
//           icon={<LogOut />}
//           label="Logout"
//           onPress={() => console.log('Logout pressed')}
//           showChevron={false}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollContainer: {
//     paddingTop: 0,
//   },
//   profileContainer: {
//     padding: 24,
//     paddingBottom: 16,
//     backgroundColor: '#f8fafc',
//   },
//   avatarContainer: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: '#e0e7ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   avatar: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1e293b',
//     marginBottom: 4,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#64748b',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e2e8f0',
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   menuContainer: {
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//   },
//   drawerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 4,
//   },
//   activeDrawerItem: {
//     backgroundColor: '#eef2ff',
//   },
//   iconContainer: {
//     width: 24,
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   drawerItemText: {
//     fontSize: 16,
//     color: '#334155',
//     flex: 1,
//   },
//   activeDrawerItemText: {
//     color: '#6366f1',
//     fontWeight: '600',
//   },
//   chevronIcon: {
//     marginLeft: 8,
//   },
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#e2e8f0',
//   },
// });

// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
// import { MenuIcon, HomeIcon, UserIcon, SettingsIcon, HelpCircleIcon, LogOutIcon } from 'lucide-react-native';

// type DrawerItemProps = {
//   icon: React.ReactNode;
//   label: string;
//   onPress: () => void;
//   active?: boolean;
// };

// const DrawerItem = ({ icon, label, onPress, active }: DrawerItemProps) => {
//   return (
//     <TouchableOpacity 
//       onPress={onPress}
//       className={`flex-row items-center px-4 py-3 rounded-lg mb-1 ${active ? 'bg-blue-100' : ''}`}
//     >
//       <View className="mr-3">
//         {icon}
//       </View>
//       <Text className={`text-base ${active ? 'font-bold text-blue-600' : 'text-gray-800'}`}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export function CustomDrawer(props: any) {
//   const navigation = useNavigation();
  
//   // Example user profile data
//   const userProfile = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     avatar: null, // Replace with your image path
//   };

//   return (
//     <View className="flex-1 bg-white">
//       <DrawerContentScrollView {...props}>
//         {/* User Profile Section */}
//         <View className="px-4 py-6 border-b border-gray-200">
//           <View className="w-16 h-16 bg-blue-100 rounded-full mb-3 items-center justify-center">
//             {userProfile.avatar ? (
//               <Image
//                 source={{ uri: userProfile.avatar }}
//                 className="w-16 h-16 rounded-full"
//               />
//             ) : (
//               <UserIcon size={32} color="#3b82f6" />
//             )}
//           </View>
//           <Text className="text-lg font-bold">{userProfile.name}</Text>
//           <Text className="text-sm text-gray-500">{userProfile.email}</Text>
//         </View>

//         {/* Drawer Items */}
//         <View className="px-2 py-4">
//           <DrawerItem
//             icon={<HomeIcon size={22} color="#4b5563" />}
//             label="Home"
//             onPress={() => navigation.navigate('Home')}
//             active={true}
//           />
//           <DrawerItem
//             icon={<UserIcon size={22} color="#4b5563" />}
//             label="Profile"
//             onPress={() => navigation.navigate('Profile')}
//           />
//           <DrawerItem
//             icon={<SettingsIcon size={22} color="#4b5563" />}
//             label="Settings"
//             onPress={() => navigation.navigate('Settings')}
//           />
//           <DrawerItem
//             icon={<HelpCircleIcon size={22} color="#4b5563" />}
//             label="Help & Support"
//             onPress={() => navigation.navigate('Help')}
//           />
//         </View>
//       </DrawerContentScrollView>

//       {/* Bottom Section with Logout */}
//       <View className="p-4 border-t border-gray-200">
//         <DrawerItem
//           icon={<LogOutIcon size={22} color="#ef4444" />}
//           label="Logout"
//           onPress={() => {
//             // Add your logout logic here
//             console.log('Logout pressed');
//           }}
//         />
//       </View>
//     </View>
//   );
// }



