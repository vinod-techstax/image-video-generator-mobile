import HomeScreen from '@/screens/home';
import ImageScreen from '@/screens/image';
import PricingScreen from '@/screens/pricing';
import VideoScreen from '@/screens/video';
import ContactScreen from '@/screens/contact';
import AboutUsScreen from '@/screens/about-us';
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

export const navigationItems = [
    {
      icon: Home,
      label: 'Home',
      route: 'Home',
      component: HomeScreen
    },
    {
      icon: GalleryIcon,
      label: 'Image',
      route: 'Image',
      component: ImageScreen
    },
    {
      icon: GalleryIcon,
      label: 'Video', 
      route: 'Video',
      component: VideoScreen
    },
    {
      icon: DollarSign,
      label: 'Pricing',
      route: 'Pricing',
      component: PricingScreen
    },
    {
      icon: Mail,
      label: 'Contact',
      route: 'Contact',
      component: ContactScreen
    },
    {
      icon: Info,
      label: 'About Us',
      route: 'AboutUs',
      component: AboutUsScreen
    }
  ]