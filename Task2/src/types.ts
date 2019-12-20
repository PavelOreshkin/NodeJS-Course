export type User = {
  id: string;
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
