import type { User } from "@/types/User";

export const loadUsers = (): User[] => {
  try {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load users from localStorage:", e);
    return [];
  }
};

export const saveUsers = (users: User[]) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save users to localStorage:", e);
  }
};
