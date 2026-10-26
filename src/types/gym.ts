export interface BusinessInfo {
  name: string;
  tagline: string;
  category: string;
  locationArea: string;
  rating: number;
  reviewCount: number;
  maxRating: number;
  phone: string;
  rawPhone: string;
  whatsappNumber: string;
  plusCode: string;
  reportedHours: string;
  hoursNote: string;
  address: {
    line1: string;
    landmark: string;
    district: string;
    city: string;
    country: string;
    full: string;
  };
  links: {
    googleMapsSearch: string;
    googleMapsDirections: string;
    googleReviews: string;
    whatsappDirect: string;
    telDirect: string;
  };
}

export interface TrainingCard {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  badge?: string;
  image: string;
  features: string[];
}

export interface WhyUsBenefit {
  id: string;
  title: string;
  description: string;
  iconName: 'Target' | 'Dumbbell' | 'MapPin' | 'Compass' | 'Trophy' | 'Flame' | 'Zap' | 'Shield';
  metric: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'converted' | 'archived';

export interface Inquiry {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  message?: string;
  interestedIn: 'Membership' | 'Personal Training' | 'General Enquiry';
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string; // e.g. "/ month", "/ 3 months", "/ year", "/ day"
  isPopular?: boolean;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
  isActive: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  certifications: string[];
  image: string;
  isActive: boolean;
}

export interface Announcement {
  enabled: boolean;
  badge: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
}
