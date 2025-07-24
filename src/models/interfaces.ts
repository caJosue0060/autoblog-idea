export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Thesis {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Citation {
  id: string;
  thesisId: string;
  author: string;
  content: string;
  source?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  citationId: string;
  content: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Objection {
  id: string;
  thesisId: string;
  content: string;
  response: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface NavigationItem {
  name: string;
  slug: string;
  expanded?: boolean;
  children?: NavigationItem[];
}