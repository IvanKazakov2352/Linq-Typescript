export interface User {
  age: number;
  name: string;
  id: number;
}

export interface IValue {
  code: number;
  timeStamp: number;
  timeStamp2: number;
  value: number;
}

const minute: number = 60000

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

export const getMockData = (count: number): IValue[] => {
  const values: IValue[] = [];

  for (let i = 0; i < count; i++) {
    values.push({
      code: Math.floor(Math.random() * 600000),
      timeStamp: new Date().getTime(),
      timeStamp2: new Date().getTime() + minute * i,
      value: i += i << 2
    })
  }

  return values
}