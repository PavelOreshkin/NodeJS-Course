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

export type ValidationError = {
  message: string,
  path: string[],
  type: string,
  context: object
};
