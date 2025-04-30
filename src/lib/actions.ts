"use server";
import { User, Post } from "./models";

const url =
  "https://not-reddit-2b00b-default-rtdb.europe-west1.firebasedatabase.app/";

export async function addData(newData: User | Post, method: string) {
  if (method === "user") {
    const userExist = await checkUserExists(newData as User, "signup");
    if (userExist!.status === true) {
      throw new Error("Email is already taken");
    } else if (userExist!.status === false) {
      throw new Error("Username is already taken");
    }
  }

  let updatedUrl = url + (method === "user" ? "Users" : "Posts") + ".json";
  const response = await fetch(updatedUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    console.error("Error creating data:", response.statusText);
    throw response.type || "Failed to create data";
  }
  return { status: true };
}

export async function checkUserExists(
  checkedUser: User,
  method: string
): Promise<{ status: boolean; user?: User } | null> {
  const users = (await fetchAllData("user")) as User[];

  if (method === "signup") {
    for (const user of users) {
      if (user.email! === checkedUser.email) {
        return { status: true }; //email is already taken
      } else if (user.name! === checkedUser.name) {
        return { status: false }; //email is already taken //username is already taken
      }
    }
  }

  if (method === "login") {
    for (const user of users) {
      if (
        user.email.trim().toLowerCase() ===
          checkedUser.email?.trim().toLowerCase() &&
        user.password === checkedUser.password
      ) {
        return { status: true, user }; //user exists
      } else if (user.email === checkedUser.email) {
        return { status: false }; //email or password inccorect
      }
    }
  }
  return null; //user does not exist
}

export async function fetchAllData(method: string): Promise<User[] | Post[]> {
  let updatedUrl = url + (method === "user" ? "Users" : "Posts") + ".json";
  const response = await fetch(updatedUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.type || "Failed to fetch data");
  }

  const data = Object.values((await response.json()) || []) as User[] | Post[];
  return data.reverse();
}
