export type User = {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type RequestBody = {
  login: string;
  password: string;
  age: number;
};
