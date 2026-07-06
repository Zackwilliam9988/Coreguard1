export interface Service {
  id: string;
  title: string;
  price?: string;
  description: string;
  fullDescription: string;
  iconName: string;
  hot?: boolean;
  imageUrl?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  serviceId?: string;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
