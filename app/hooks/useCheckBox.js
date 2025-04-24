import { useState } from 'react';
export const useCheckBox = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle, setIsShowing];
};
