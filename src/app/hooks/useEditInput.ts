"use client";
import { useState } from "react";

export function useInput(
  initialValue: string,
  updateFunction: (value: string) => void
) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateFunction(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    updateFunction(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
  };
}
