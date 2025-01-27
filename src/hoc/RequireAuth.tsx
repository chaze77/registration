import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import Authorization from '@/pages/Authorization';
import Spinner from '@/components/ui/Spinner';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [fetchUser]);

  if (isLoading) {
    return <Spinner />;
  }

  // Если пользователь не найден или у него нет метки "admin"
  if (!user || !user?.labels?.includes('admin')) {
    return <Authorization />;
  }

  // Если пользователь найден и он администратор
  return <>{children}</>;
};

export default RequireAuth;
