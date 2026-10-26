import type {
  BusinessInfo,
  TrainingCard,
  WhyUsBenefit,
  FAQItem,
  NavItem,
  Inquiry,
  MembershipPlan,
  Trainer,
  Announcement
} from '../types/gym';

export type {
  BusinessInfo,
  TrainingCard,
  WhyUsBenefit,
  FAQItem,
  NavItem,
  Inquiry,
  MembershipPlan,
  Trainer,
  Announcement
};

export const CLUB_DATA: BusinessInfo = {
  name: "Fitness Zone – City Walk Dubai",
  tagline: "Built For Your Next Level.",
  category: "Gym / Fitness Club",
  locationArea: "City Walk Mall, Al Wasl, Dubai",
  rating: 4.6,
  reviewCount: 203,
  maxRating: 5.0,
  phone: "+971 54 727 4777",
  rawPhone: "+971547274777",
  whatsappNumber: "971547274777",
  plusCode: "6746+QJ Dubai, United Arab Emirates",
  reportedHours: "Reported: Open until 11:00 PM",
  hoursNote: "Closing time reported on Google listing. Please confirm exact weekend and holiday timings with the club directly.",
  address: {
    line1: "City Walk Mall",
    landmark: "Next to Beit el Kel Restaurant",
    district: "Al Wasl",
    city: "Dubai",
    country: "United Arab Emirates",
    full: "City Walk Mall, next to Beit el Kel Restaurant, Al Wasl, Dubai, United Arab Emirates"
  },
  links: {
    googleMapsSearch: "https://www.google.com/maps/search/?api=1&query=Fitness+Zone+City+Walk+Dubai",
    googleMapsDirections: "https://www.google.com/maps/dir/?api=1&destination=Fitness+Zone+City+Walk+Dubai",
    googleReviews: "https://www.google.com/maps/search/?api=1&query=Fitness+Zone+City+Walk+Dubai+Reviews",
    whatsappDirect: "https://wa.me/971547274777?text=Hello%20Fitness%20Zone%20City%20Walk,%20I%20would%20like%20to%20enquire%20about%20membership%20options.",
    telDirect: "tel:+971547274777"
  }
};

export const NAV_ITEMS: NavItem[] = [
  { label: "The Club", href: "#experience" },
  { label: "Training", href: "#training" },
  { label: "Plans", href: "#pricing" },
  { label: "Coaches", href: "#coaches" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

export const TRAINING_EXPERIENCES: TrainingCard[] = [
  {
    id: "strength-conditioning",
    title: "STRENGTH & CONDITIONING",
    subtitle: "Built on discipline & progression",
    tag: "Core Focus",
    description: "Build consistency, develop strength, and work towards your personal goals in an environment designed for serious effort.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Focused resistance training atmosphere",
      "Spacious dedicated lifting zones",
      "Progressive overload culture"
    ]
  },
  {
    id: "personal-training",
    title: "PERSONAL TRAINING",
    subtitle: "One-to-one coaching guidance",
    tag: "Enquire Option",
    badge: "Enquire with Team",
    description: "Explore one-to-one coaching options tailored to your training goals. Enquire directly to align with a dedicated trainer.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Tailored workout structure",
      "Accountability & technique focus",
      "Goal-driven session planning"
    ]
  },
  {
    id: "fitness-journey",
    title: "YOUR FITNESS JOURNEY",
    subtitle: "Sustainable habits & rhythm",
    tag: "Lifestyle",
    description: "Find your rhythm, stay committed, and make progress one session at a time with a supportive, focused club vibe.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Balanced endurance & mobility",
      "Consistent routine development",
      "Motivating club atmosphere"
    ]
  }
];

export const WHY_US_BENEFITS: WhyUsBenefit[] = [
  {
    id: "focused-environment",
    title: "A Focused Training Environment",
    description: "Designed for individuals dedicated to genuine training and steady progress, free from clutter and gimmicks.",
    iconName: "Target",
    metric: "01"
  },
  {
    id: "space-for-goals",
    title: "Space to Work Towards Your Goals",
    description: "Ample room, clear layout, and an atmosphere crafted to help you push your personal boundaries every session.",
    iconName: "Dumbbell",
    metric: "02"
  },
  {
    id: "city-walk-location",
    title: "A Convenient City Walk Location",
    description: "Centrally positioned in City Walk Mall, Al Wasl, right next to Beit el Kel Restaurant, easily accessible for your daily routine.",
    iconName: "MapPin",
    metric: "03"
  },
  {
    id: "journey-around-you",
    title: "A Fitness Journey Built Around You",
    description: "Whether building a consistent habit or advancing your athletic strength, your progress and goals take center stage.",
    iconName: "Compass",
    metric: "04"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-location",
    question: "Where is Fitness Zone – City Walk Dubai located?",
    answer: "Fitness Zone is located inside City Walk Mall, Al Wasl, Dubai, right next to Beit el Kel Restaurant (Google Plus Code: 6746+QJ Dubai, United Arab Emirates). There is convenient access and parking throughout City Walk Mall."
  },
  {
    id: "faq-contact",
    question: "How can I contact the club?",
    answer: "You can call or WhatsApp the club directly at +971 54 727 4777, or submit an enquiry using the form on this website. Our team will get back to you promptly."
  },
  {
    id: "faq-membership-enquiry",
    question: "How can I enquire about membership?",
    answer: "Fill out the membership enquiry form below with your name, phone number, and interest area. You can also click the Call or WhatsApp buttons to connect directly with the club staff."
  },
  {
    id: "faq-personal-training",
    question: "Is personal training available?",
    answer: "One-to-one personal coaching is available as an option to enquire about. Our staff can connect you with certified fitness coaches to discuss your specific goals and training schedule."
  },
  {
    id: "faq-membership-options",
    question: "What are the membership options?",
    answer: "Fitness Zone offers flexible membership packages ranging from monthly commitments to VIP annual memberships. Contact us or enquire to view tailored options."
  },
  {
    id: "faq-hours",
    question: "What are the club's opening hours?",
    answer: "The Google business listing reports that Fitness Zone is open until 11:00 PM. Weekend or holiday hours may vary, so we suggest calling +971 54 727 4777 to confirm daily operating times."
  }
];

export const DEFAULT_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "day-pass",
    name: "Day Access Pass",
    subtitle: "Single Session Trial",
    price: "150 AED",
    period: "/ day",
    description: "Full access to our premium facilities for one full day. Ideal for visitors or trying the floor.",
    features: [
      "Full strength & cardio floor access",
      "Locker & luxury rainfall showers",
      "Complimentary locker towel service",
      "High-speed fiber WiFi",
      "Free 3-hour City Walk parking"
    ],
    ctaText: "Enquire for Day Pass",
    isActive: true
  },
  {
    id: "monthly-flex",
    name: "Monthly Flexible",
    subtitle: "Zero Commitment",
    price: "850 AED",
    period: "/ month",
    description: "Train without any long-term contracts. Pause or cancel with just 15 days written notice.",
    features: [
      "Unlimited club access 7 days a week",
      "State-of-the-art resistance machines",
      "Complimentary fitness assessment",
      "Full locker room & sauna amenities",
      "Member discounts on PT packages"
    ],
    ctaText: "Choose Monthly Plan",
    isActive: true
  },
  {
    id: "quarterly-momentum",
    name: "3-Month Transformation",
    subtitle: "Most Popular Choice",
    price: "2,250 AED",
    period: "/ 3 months",
    isPopular: true,
    badge: "MOST POPULAR",
    description: "Designed for individuals committed to noticeable body recomposition and athletic progress.",
    features: [
      "Everything included in Monthly",
      "1 Complimentary 1-on-1 PT coaching session",
      "Comprehensive InBody 570 body scan",
      "Personalized training workout roadmap",
      "10% off cafe & sports nutrition corner"
    ],
    ctaText: "Start Transformation",
    isActive: true
  },
  {
    id: "annual-vip",
    name: "Annual Elite VIP",
    subtitle: "Maximum Performance Value",
    price: "7,200 AED",
    period: "/ year",
    badge: "BEST VALUE",
    description: "Our premier membership tier for dedicated athletes living or working in and around City Walk.",
    features: [
      "All-access 365 days priority access",
      "4 Complimentary 1-on-1 PT coaching sessions",
      "Unlimited monthly InBody progress scans",
      "Dedicated personal locker reservation",
      "5 complimentary guest passes per year",
      "Priority equipment & training zone access"
    ],
    ctaText: "Claim VIP Membership",
    isActive: true
  }
];

export const DEFAULT_TRAINERS: Trainer[] = [
  {
    id: "trainer-1",
    name: "Marcus Vance",
    role: "Head Strength Coach",
    specialty: "Powerlifting & Athletic Hypertrophy",
    bio: "10+ years coaching professional athletes and executive clients. Passionate about barbell precision and progressive overload.",
    certifications: ["CSCS Certified", "NASM-CPT", "REPs UAE Level 3"],
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
    isActive: true
  },
  {
    id: "trainer-2",
    name: "Elena Rostova",
    role: "Mobility & Performance Coach",
    specialty: "Biomechanics & Core Stabilization",
    bio: "Former gymnast specializing in joint mobility, injury resilience, functional hypertrophy, and posture correction.",
    certifications: ["EXOS Performance Specialist", "FMS Level 2", "Pilates Master"],
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
    isActive: true
  },
  {
    id: "trainer-3",
    name: "Tariq Al-Mansoor",
    role: "Body Transformation Specialist",
    specialty: "Fat Loss & Nutrition Strategy",
    bio: "Helped over 250+ clients achieve sustainable fat loss and peak physical conditioning with science-backed programming.",
    certifications: ["ISSA Master Trainer", "Precision Nutrition PN1"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    isActive: true
  }
];

export const DEFAULT_ANNOUNCEMENT: Announcement = {
  enabled: false,
  badge: "SPECIAL OFFER",
  message: "Join this month and receive 2 Complimentary 1-on-1 Personal Coaching Sessions with InBody Scan!",
  linkText: "Claim Offer",
  linkUrl: "#membership-enquiry"
};

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "FZ-982142",
    fullName: "Ahmed Al-Maktoum",
    phoneNumber: "+971 50 123 4567",
    email: "ahmed.m@example.ae",
    message: "Interested in 1-on-1 personal training for muscle building during weekday evenings.",
    interestedIn: "Personal Training",
    status: "new",
    adminNotes: "Preferred time 7:00 PM. Coach Marcus recommended.",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 mins ago
  },
  {
    id: "FZ-941820",
    fullName: "Sarah Jenkins",
    phoneNumber: "+971 55 987 6543",
    email: "sarah.j@example.com",
    message: "Would love to test the equipment with a Day Pass this Saturday morning.",
    interestedIn: "Membership",
    status: "contacted",
    adminNotes: "Spoke via WhatsApp. Scheduled tour for Saturday 10:30 AM.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
  },
  {
    id: "FZ-883912",
    fullName: "Omar Farooq",
    phoneNumber: "+971 52 445 1122",
    email: "omar.farooq@example.ae",
    message: "Looking for Annual VIP membership for myself and business partner. Please share details.",
    interestedIn: "Membership",
    status: "converted",
    adminNotes: "Converted to 2x Annual VIP memberships. Welcome pack handed over.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() // yesterday
  }
];
