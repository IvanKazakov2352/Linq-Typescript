export interface User {
  age: number;
  name: string;
  id: number;
}

export const getUsers = (count: number): User[] => {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: Math.floor(Math.random() * 600),
      name: `user${i}`,
      age: i * count
    })
  }

  return users
}

export const numbers = (count: number): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i < count; i++) {
    numbers.push(i)
  }

  return numbers
};
