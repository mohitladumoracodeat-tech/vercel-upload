import React from 'react';
import {
  Code2,
  Cpu,
  Globe,
  Database,
  Server,
  BrainCircuit,
  Sparkles,
  HelpCircle,
  FileQuestion,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

const iconMap = {
  Code2,
  Cpu,
  Globe,
  Database,
  Server,
  BrainCircuit,
  Sparkles,
  HelpCircle,
  FileQuestion,
  Layers,
  Award,
  Zap,
};

export const DynamicIcon = ({ name, className = 'w-5 h-5', ...props }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;
