import React, { createContext, useState } from 'react';

interface SuccessContextProps {
  isSuccess: boolean;
  setSuccess: (value: boolean) => void;
}

export const SuccessContext = createContext<SuccessContextProps | undefined>(
  undefined
);

export const SuccessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <SuccessContext.Provider value={{ isSuccess, setSuccess: setIsSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};
