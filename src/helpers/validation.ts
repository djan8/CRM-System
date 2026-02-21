export function checkValidate(title: string) {
  const value = title.trim();
  if (value && value.length > 2 && value.length <= 64) {
    return value;
  }
  throw new Error("валидация провалена");
}
