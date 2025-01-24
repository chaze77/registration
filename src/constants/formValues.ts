// Интерфейс для правил валидации поля
interface FieldRules {
  required?: string; // Сообщение, если поле обязательно
  pattern?: { value: RegExp; message: string }; // Регулярное выражение и сообщение об ошибке
  minLength?: { value: number; message: string }; // Минимальная длина и сообщение
  maxLength?: { value: number; message: string }; // Максимальная длина и сообщение
}

// Интерфейс для описания полей
interface Field {
  name: string; // Имя поля (например, 'email', 'password')
  label: string; // Метка для отображения
  type: string; // Тип ввода (например, 'text', 'password')
  rules: FieldRules; // Правила валидации
}

// Типизация массива полей
export const fields: Field[] = [
  {
    name: 'email',
    label: 'Почтовый адрес',
    type: 'text',
    rules: {
      required: 'Введите почтовый адрес',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный почтовый адрес',
      },
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    rules: {
      required: 'Введите пароль',
      minLength: {
        value: 8,
        message: 'Пароль должен быть не менее 8 символов',
      },
      maxLength: {
        value: 20,
        message: 'Пароль должен быть не более 20 символов',
      },
    },
  },
];
