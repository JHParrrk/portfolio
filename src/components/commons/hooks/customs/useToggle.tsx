import { useState } from "react";

export const useToggle = (): [boolean, () => void] => {
  const [isToggle, setIsToggle] = useState(false);

  const onToggle = () => {
    setIsToggle((prev) => !prev);
  };

  return [isToggle, onToggle];
};
