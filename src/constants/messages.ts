const messages = {
  auth: {
    loginSuccess: 'Вы успешно вошли в систему!',
    loginError: 'Неправильный логин или пароль.',
    logoutSuccess: 'Вы успешно вышли из системы!',
    logoutError: 'Ошибка при выходе.',
    fetchUserError: 'Не удалось получить данные пользователя.',
  },
  general: {
    unexpectedError: 'Произошла неожиданная ошибка.',
    createdSuccess: 'Успешно создано',
    updatedSuccess: 'Успешно обновлено',
    deletedSuccess: 'Запись удалена',
  },
  register: {
    registerSuccess: 'Вы успешно зарегистрировались!',
    registerError: 'Ошибка при регистрации',
  },
  errors: {
    'Invalid credentials': 'Неправильный логин или пароль.',
    'User not found': 'Пользователь не найден.',
    'Network error': 'Ошибка сети. Попробуйте позже.',
    default: 'Произошла ошибка. Попробуйте снова.',
  },
};

export default messages;
