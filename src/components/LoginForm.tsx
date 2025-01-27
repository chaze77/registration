import { fields } from '@/constants/formValues';
import useAuthStore from '@/store/useAuthStore';
import useGlobalStore from '@/store/useGlobalStore';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Spinner from './ui/Spinner';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = useGlobalStore((state) => state.isLoading);
  const setLoading = useGlobalStore((state) => state.setLoading);

  const login = useAuthStore((state) => state.login);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    } finally {
      setLoading(false); // Гарантированно выполнится
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box
        width='100%'
        maxWidth='500px'
        sx={{ textAlign: 'left', mb: 2 }}
      >
        <Typography
          variant='h4'
          gutterBottom
        >
          Вход
        </Typography>
      </Box>

      {/* Форма авторизации */}
      <Box
        component='form'
        width='100%'
        maxWidth='500px'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          spacing={3}
          sx={{ mb: 3 }}
        >
          {fields.map(({ name, label, rules, type }) => (
            <Controller
              key={name}
              name={name as keyof FormValues}
              control={control}
              rules={rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={type}
                  label={label}
                  error={!!errors[name as keyof FormValues]}
                  helperText={errors[name as keyof FormValues]?.message}
                />
              )}
            />
          ))}
        </Stack>

        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
        >
          Войти
        </Button>
      </Box>
      {isLoading && <Spinner />}
    </Container>
  );
};

export default Login;
