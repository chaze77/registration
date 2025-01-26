import { useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

interface FilterProps {
  onSearch: (filters: { name?: string; email?: string }) => void;
  onClear: () => void;
}

const FormFilter: React.FC<FilterProps> = ({ onSearch, onClear }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      email: email || undefined, // Если поле пустое, убираем фильтр
    });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    onClear();
  };

  return (
    <div>
      <Stack
        direction='row'
        spacing={1}
      >
        <TextField
          size='small'
          label='Наименование'
          value={name}
          onChange={(e) => setName(e.target.value)} // Исправлено: корректное использование onChange
        />
        <TextField
          size='small'
          label='Почта'
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Исправлено: корректное использование onChange
          sx={{ maxWidth: '150px' }}
        />
        <Stack direction='row'>
          <IconButton
            color='primary'
            aria-label='search'
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            color='warning'
            aria-label='clear'
            onClick={handleClear}
          >
            <RotateLeftIcon />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default FormFilter;
