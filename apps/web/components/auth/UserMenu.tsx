'use client';

import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserServices } from '@/services/userServices';

export function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await UserServices.logout(UserServices.getToken() || '');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <div className="font-medium">{user?.name || user?.email}</div>
        <div className="text-gray-500">{user?.role}</div>
      </div>
      <Button onClick={handleLogout} variant="outline" size="sm">
        Déconnexion
      </Button>
    </div>
  );
}
