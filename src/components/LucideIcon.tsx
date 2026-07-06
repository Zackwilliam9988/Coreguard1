import { 
  Camera, 
  Cable, 
  Network, 
  Wrench, 
  Activity, 
  Fingerprint, 
  Shuffle, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Users, 
  Coins, 
  Award, 
  Headphones,
  Check,
  CheckCircle,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Shield,
  HelpCircle
} from "lucide-react";
import React from "react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Camera,
  Cable,
  Network,
  Wrench,
  Activity,
  Fingerprint,
  Shuffle,
  Smartphone,
  ShieldCheck,
  Zap,
  Users,
  Coins,
  Award,
  Headphones,
  Check,
  CheckCircle,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Shield
};

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, className, size }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} size={size} />;
};
