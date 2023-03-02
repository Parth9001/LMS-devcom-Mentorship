export interface SideNavItem {
  title: string;
  link: string;
}

export enum UserType {
  ADMIN,
  USER,
}

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  blocked: boolean;
  active: boolean;
  createdOn: string;
  userType: UserType;
  fine: number;
}

export interface Book {
  id: number;
  title: string;
  genre: string;
  price: number;
  available: boolean;
  count?: number;
  author: string;
}

export interface GenreBooks {
  genre: string;
  books: Book[];
}

export interface Order {
  id: number;
  userid: number;
  name: string;
  bookid: number;
  booktitle: string;
  orderedon: string;
  status: string;
}

export interface Genre {
  name: string;
  children?: Genre[];
}
