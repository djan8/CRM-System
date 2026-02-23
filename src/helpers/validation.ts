export function checkValidate(title: string) {
  const value = title.trim();
  if (!value) {
    throw new Error("Не может быть пусто");
  }
  if (value.length <= 2) {
    throw new Error("Не может быть меньше двух");
  }
  if (value.length >= 64) {
    throw new Error("Не может быть больше 64");
  }
}
