import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { Controller, useForm } from 'react-hook-form';
import { fields } from '../constants/formValues';
import { databases } from '../appwrite/config';
import { ID } from 'appwrite';
import { useContext, useState } from 'react';
import Spinner from './ui/Spinner'; // Убедитесь, что компонент Spinner существует
import showMessage from '../hooks/useNotify';
import { SuccessContext } from '../context/SuccessContext';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_FORM_COLLECTION_ID;

const RegisterForm = () => {
  const [isLoading, setIsloading] = useState(false);
  const context = useContext(SuccessContext);

  // Добавлена защита на случай, если контекст не найден
  if (!context) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  const { setSuccess } = context;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      comment: '',
    },
  });

  const theme = useTheme();

  const createDocument = async (
    databaseId: string,
    collectionId: string,
    data: FormValues
  ): Promise<void> => {
    await databases.createDocument(databaseId, collectionId, ID.unique(), data);
  };

  const onSubmit = async (data: FormValues) => {
    setIsloading(true); // Включаем индикатор загрузки
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, data);
      showMessage('success', 'Регистрация прошла успешна');
      setSuccess(true); // Устанавливаем состояние успеха
      reset(); // Сброс формы
    } catch (error) {
      console.error('Ошибка при обработке формы:', error);
      showMessage('error', 'Ошибка при регистрации, попробуйте позже');
    } finally {
      setIsloading(false); // Выключаем индикатор загрузки
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
      <Box sx={{ maxWidth: '500px', width: '100%' }}>
        <Typography
          variant='h4'
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.h5.fontSize,
            },
            textAlign: 'left',
          }}
          gutterBottom
        >
          Заявка на регистрацию
        </Typography>
      </Box>
      <Stack
        component='form'
        width='100%'
        maxWidth='500px'
        onSubmit={handleSubmit(onSubmit)}
        spacing={3}
        sx={{ mb: 3 }}
      >
        {fields.map(({ name, label, required, type, validate, pattern }) => (
          <Controller
            key={name}
            name={name as keyof FormValues}
            control={control}
            rules={{
              required: required as string,
              validate,
              pattern,
            }}
            render={({ field }) =>
              type === 'tel' ? (
                <MuiTelInput
                  {...field}
                  label={label}
                  fullWidth
                  defaultCountry='RU'
                  onlyCountries={['RU']}
                  disableDropdown
                  error={!!errors[name as keyof FormValues]}
                  helperText={errors[name as keyof FormValues]?.message}
                  onChange={(value) => field.onChange(value)}
                />
              ) : (
                <TextField
                  {...field}
                  fullWidth
                  label={label}
                  error={!!errors[name as keyof FormValues]}
                  helperText={errors[name as keyof FormValues]?.message}
                />
              )
            }
          />
        ))}
        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#2a1771',
            '&:hover': {
              backgroundColor: '#7d63b8',
            },
            textTransform: 'none',
          }}
        >
          Отправить
        </Button>
      </Stack>
      {isLoading && <Spinner />} {/* Отображаем спиннер при загрузке */}
    </Container>
  );
};

export default RegisterForm;
