export interface ServerResponse<T> {
  data?: T;
  message: string;
  isOk: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date;
}
