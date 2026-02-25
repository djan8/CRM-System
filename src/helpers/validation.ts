type ValidationResult = {
  errorMessage: string;
  isValid: boolean;
};

export function validateTodoTitle(title: string): ValidationResult {
  const value = title.trim();
  if (!value) {
    return {
      errorMessage: "Не может быть пусто",
      isValid: false,
    };
    // throw new Error("Не может быть пусто");
  }
  if (value.length < 2) {
    return {
      errorMessage: "Не может быть меньше двух",
      isValid: false,
    };
  }
  if (value.length > 64) {
    return {
      errorMessage: "Не может быть больше 64",
      isValid: false,
    };
  }
  return { errorMessage: "", isValid: true };
}
