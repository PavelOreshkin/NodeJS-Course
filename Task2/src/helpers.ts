import { db } from "./db/db";

export const getNewId = (): string => {
  const currentId = db.reduce((prev, item) => {
    const id = Number(item.id);
    return (id > prev) ? id : prev;
  }, 0);
  return String(currentId + 1)
};

export const addUser = (login: string, password: string, age: number) => {
  db.push({ login, password, age, id: getNewId(), isDeleted: false })
};

export const deleteUser = (id: string) => {
  db.forEach(item => {
    if (item.id === id) item.isDeleted = true
  })
};

export const isUserExist = (id: string): boolean => {
  const index = db.findIndex(item => item.id === id);
  return index >= 0;
};
