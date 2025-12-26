import { useAuthHeaders, useAuthStore, User } from "@/lib/auth-store";
import { LoginResponse } from "@/types/authType";

export class UserServices {

  static async getAllUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
    return res.json();
  }
  
  static async getUserById(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
    return res.json();
  }

  static async register(userData: {
    email: string;
    password: string;
    name?: string;
  }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return res.json();
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    useAuthStore.getState().login(data.user, data.token);

    return data;
  }

  static async getCurrentUser() {
    const { headers } = useAuthHeaders();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return response.json();
  }

  // Helper function to check if user is authenticated
  static isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated;
  }

  // Helper function to get current token
  static getToken(): string | null {
    return useAuthStore.getState().token;
  }

  // Helper function to get current user
  static getCurrentUserFromStore(): User | null {
    return useAuthStore.getState().user;
  }

  static async getProfile(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return res.json();
  }

  static async updateProfile(token: string, userData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    return res.json();
  }

  static async logout(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return res.json();
  }
}