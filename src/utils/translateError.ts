// utils/translateError.ts

import messages from '@/constants/messages';

export const translateError = (errorText: string): string => {
  // Ищем, включен ли текст ошибки в словарь
  for (const [key, message] of Object.entries(messages.errors)) {
    if (errorText.includes(key)) {
      return message;
    }
  }

  return messages.errors.default;
};
