import { fields } from '@/constants/formValues';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('data');
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
    </Container>
  );
};

export default Login;
