'use server';

import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log(users);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log({ newUser });
    return { newUser };
  } catch (error: unknown) {
    if (error && (error as { code: number }).code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])]);
      return documents?.users[0];
    }
    console.log(error);
  }
};
