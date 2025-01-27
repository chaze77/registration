import { useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

interface FilterProps {
  onSearch: (filters: { name?: string; $id?: string }) => void;
  onClear: () => void;
}

const MuseumFilter: React.FC<FilterProps> = ({ onSearch, onClear }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      $id: id || undefined,
    });
  };

  const handleClear = () => {
    setName('');
    setId('');
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
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          size='small'
          label='ID'
          value={id}
          onChange={(e) => setId(e.target.value)}
          sx={{ maxWidth: '200px' }}
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

export default MuseumFilter;
