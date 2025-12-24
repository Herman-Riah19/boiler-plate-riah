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
  }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return res.json();
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