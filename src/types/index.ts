export interface Property {
  id: string;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  price: number;
  location: string;
  locationRu: string;
  address: string;
  university: string;
  distanceFromUniversity: number;
  images: string[];
  amenities: string[];
  amenitiesRu: string[];
  rating: number;
  reviewCount: number;
  roomType: 'single' | 'shared' | 'family';
  gender: 'male' | 'female' | 'coed';
  available: boolean;
  totalRooms: number;
  availableRooms: number;
  landlordId: string;
  rules: string[];
  rulesRu: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'pending';
  featured: boolean;
}

export interface Landlord {
  id: string;
  name: string;
  photo: string;
  phone: string;
  telegram: string;
  email: string;
  rating: number;
  responseTime: string;
  verified: boolean;
  totalProperties: number;
  joinedDate: Date;
  documents: {
    passport: string;
    license: string;
  };
}

export interface Application {
  id: string;
  propertyId: string;
  property: Property;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  submittedAt: Date;
  studentInfo: {
    fullName: string;
    email: string;
    phone: string;
    university: string;
    studyProgram: string;
    studentId: string;
  };
  moveInDate: Date;
  duration: string;
  message: string;
  landlordResponse?: string;
  documents: string[];
}

export interface University {
  id: string;
  name: string;
  nameRu: string;
  location: string;
  locationRu: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'landlord' | 'admin';
  verified: boolean;
  avatar?: string;
}

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  monthlyRevenue: number;
  occupancyRate: number;
}

export type Language = 'uz' | 'ru';