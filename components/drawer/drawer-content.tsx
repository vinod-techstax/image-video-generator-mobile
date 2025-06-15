// // components/drawer/drawer-content.tsx
// import React from 'react';
// import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { useRouter } from 'expo-router';
// import { Text } from '@/components/ui/text';
// import { useColorScheme } from '@/lib/use-color-scheme';
// import { ThemeToggle } from '@/components/theme-toggle';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Separator } from '@/components/ui/separator';
// import { useQuery } from '@tanstack/react-query';

// // Icons
// import { Home, Star, BarChart2, FileText, Settings, LogOut, ChevronRight } from 'lucide-react-native';

// // Type for user data
// interface UserData {
//   name: string;
//   email: string;
//   avatar: string;
// }

// export function DrawerContent(props: any) {
//   const router = useRouter();
//   const { isDarkColorScheme } = useColorScheme();
  
//   // Fetch user data
//   const { data: userData } = useQuery<UserData>({
//     queryKey: ['userData'],
//     queryFn: () => Promise.resolve({
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       avatar: 'https://i.pravatar.cc/150?img=68',
//     }),
//   });

//   // Define navigation items
//   const navigationItems = [
//     { 
//       key: 'home',
//       label: 'Home',
//       route: '/',
//       icon: (color: string) => <Home size={22} color={color} />,
//     },
//     { 
//       key: 'Image',
//       label: 'Image',
//       route: '/image',
//       icon: (color: string) => <Star size={22} color={color} />,
//     },
//     { 
//       key: 'stats',
//       label: 'Statistics',
//       route: '/stats',
//       icon: (color: string) => <BarChart2 size={22} color={color} />,
//     },
//     { 
//       key: 'docs',
//       label: 'Documentation',
//       route: '/docs',
//       icon: (color: string) => <FileText size={22} color={color} />,
//     },
//   ];

//   // Define bottom items
//   const bottomItems = [
//     { 
//       key: 'settings',
//       label: 'Settings',
//       route: '/settings',
//       icon: (color: string) => <Settings size={22} color={color} />,
//     },
//     { 
//       key: 'logout',
//       label: 'Logout',
//       onPress: () => console.log('Logout pressed'),
//       icon: (color: string) => <LogOut size={22} color={color} />,
//     },
//   ];

//   return (
//     <View className="flex-1 bg-background dark:bg-background-dark">
//       <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
//         {/* User Profile Section */}
//         <View className="px-4 pt-8 pb-5">
//           <View className="flex-row items-center mb-4">
//             <Avatar alt="" className="w-12 h-12 bg-primary/10 dark:bg-primary-dark/20">
//               <AvatarImage 
//                 source={{ uri: userData?.avatar }}
//                 className="w-12 h-12"
//               />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//             <View className="ml-3">
//               <Text className="text-base font-medium text-foreground dark:text-foreground-dark">
//                 {userData?.name}
//               </Text>
//               <Text className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
//                 {userData?.email}
//               </Text>
//             </View>
//           </View>
          
//           <TouchableOpacity 
//             className="flex-row items-center justify-between p-3 rounded-md bg-primary/5 dark:bg-primary-dark/10"
//             onPress={() => router.push('/profile')}
//           >
//             <Text className="text-sm font-medium text-foreground dark:text-foreground-dark">
//               View Profile
//             </Text>
//             <ChevronRight size={18} color={isDarkColorScheme ? '#e0e0e0' : '#333333'} />
//           </TouchableOpacity>
//         </View>
        
//         <Separator className="my-2" />
        
//         {/* Navigation Items */}
//         {navigationItems.map((item) => (
//           <DrawerItem
//             key={item.key}
//             label={({ focused, color }) => (
//               <Text 
//                 className={`text-base ${focused 
//                   ? 'text-primary dark:text-primary-dark font-medium' 
//                   : 'text-foreground dark:text-foreground-dark'}`}
//               >
//                 {item.label}
//               </Text>
//             )}
//             icon={({ focused, color, size }) => 
//               item.icon(focused 
//                 ? isDarkColorScheme ? '#a3c2ff' : '#3b82f6' 
//                 : isDarkColorScheme ? '#e0e0e0' : '#333333'
//               )
//             }
//             onPress={() => router.push(item.route)}
//             activeTintColor={isDarkColorScheme ? '#a3c2ff' : '#3b82f6'}
//             activeBackgroundColor={isDarkColorScheme ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'}
//             style={{ borderRadius: 8, marginHorizontal: 8 }}
//           />
//         ))}
        
//         <Separator className="my-2" />
        
//         {/* Theme Toggle */}
//         <View className="px-6 py-2 flex-row items-center justify-between">
//           <Text className="text-base text-foreground dark:text-foreground-dark">
//             Dark Mode
//           </Text>
//           <ThemeToggle />
//         </View>
//       </DrawerContentScrollView>
      
//       {/* Bottom Items */}
//       <View className="border-t border-border dark:border-border-dark px-4 py-2">
//         {bottomItems.map((item) => (
//           <DrawerItem
//             key={item.key}
//             label={({ focused, color }) => (
//               <Text 
//                 className={`text-base ${item.key === 'logout' 
//                   ? 'text-red-500 dark:text-red-400'
//                   : 'text-foreground dark:text-foreground-dark'}`}
//               >
//                 {item.label}
//               </Text>
//             )}
//             icon={({ focused, color, size }) => 
//               item.icon(
//                 item.key === 'logout' 
//                   ? '#ef4444' 
//                   : isDarkColorScheme ? '#e0e0e0' : '#333333'
//               )
//             }
//             onPress={item.onPress || (() => router.push(item.route))}
//             style={{ borderRadius: 8 }}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }