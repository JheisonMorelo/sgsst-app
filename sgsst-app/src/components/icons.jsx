// Central icon registry — maps string keys to Lucide components.
// All emoji replacements go through here for consistency.
import {
  BarChart2, Building2, RefreshCw, ClipboardCheck, Zap,
  FolderOpen, CalendarDays, ClipboardList, ScrollText,
  MapPin, HelpCircle, Search, Check, CheckCircle2, Circle,
  FileText, PenLine, AlertTriangle, ShieldCheck, Lock,
  ChevronUp, ChevronDown, ChevronRight, Shield, Ban, Archive,
  AlertOctagon, Printer, Trophy, RotateCcw, ArrowRight,
  Hand, HardHat, Shirt, PlugZap, Flame, Radio,
  ArrowUpToLine, CheckSquare, XCircle, Info,
  BookOpen, ClipboardSignature, Wrench, Stethoscope,
  Lightbulb, Users, AlertCircle, TrendingUp,
  X, ChevronLeft, ExternalLink,
} from 'lucide-react';

export const ICON_MAP = {
  BarChart2, Building2, RefreshCw, ClipboardCheck, Zap,
  FolderOpen, CalendarDays, ClipboardList, ScrollText,
  MapPin, HelpCircle, Search, Check, CheckCircle2, Circle,
  FileText, PenLine, AlertTriangle, ShieldCheck, Lock,
  ChevronUp, ChevronDown, Shield, Ban, Archive,
  AlertOctagon, Printer, Trophy, RotateCcw, ArrowRight,
  Hand, HardHat, Shirt, PlugZap, Flame, Radio,
  ArrowUpToLine, CheckSquare, XCircle, Info,
  BookOpen, ClipboardSignature, Wrench, Stethoscope,
  Lightbulb, Users, AlertCircle, TrendingUp,
  X, ChevronLeft, ChevronRight, ExternalLink,
};

export default function Icon({ name, className = 'w-4 h-4', ...props }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp className={className} {...props} />;
}

// Re-export all for direct named imports
export {
  BarChart2, Building2, RefreshCw, ClipboardCheck, Zap,
  FolderOpen, CalendarDays, ClipboardList, ScrollText,
  MapPin, HelpCircle, Search, Check, CheckCircle2, Circle,
  FileText, PenLine, AlertTriangle, ShieldCheck, Lock,
  ChevronUp, ChevronDown, Shield, Ban, Archive,
  AlertOctagon, Printer, Trophy, RotateCcw, ArrowRight,
  Hand, HardHat, Shirt, PlugZap, Flame, Radio,
  ArrowUpToLine, CheckSquare, XCircle, Info,
  BookOpen, ClipboardSignature, Wrench, Stethoscope,
  Lightbulb, Users, AlertCircle, TrendingUp,
  X, ChevronLeft, ChevronRight, ExternalLink,
};
