import { ChangeEventHandler, MouseEventHandler } from "react";

export interface Collection {
  id: number;
  user: User;
  name: string;
  personal: boolean;
  notes: Notes[];
  added_notes: Notes[];
}
export interface User {
  id: number;
  username: string;
  email: string;
  favorite_notes: Notes[];
  favorite_collections: Collection[];
  collections: Collection[];
  errors?: string[];
}

export interface Comments {
  id: number;
  description: string;
  user: User;
  userId: number;
  noteId: number;
}

export interface Notes {
  id: number;
  title: string;
  description: string;
  language: string;
  user: User;
  comments: Comments[];
  collection: Collection;
}

export interface SignupProps {
  handleChange: ChangeEventHandler;
  credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  clearResults: Function;
  changeStatus: MouseEventHandler;
}

export interface LoginProps {
  credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: ChangeEventHandler;
  clearResults: Function;
  changeStatus: MouseEventHandler;
}

export const nullUser: User = {
  id: 0,
  username: "null",
  email: "null",
  favorite_notes: [],
  favorite_collections: [],
  collections: [],
};
