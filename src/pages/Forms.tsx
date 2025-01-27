import Title from '@/components/ui/Ttitle';
import useGlobalStore from '@/store/useGlobalStore';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ruRU } from '@mui/x-data-grid/locales';
import useFormStore from '@/store/useFormStore';
import FormFilter from '@/components/filters/FormFilter';

const Forms = () => {
  const setLoading = useGlobalStore((state) => state.setLoading);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { forms, fetchForms } = useFormStore();

  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchForms();
      } catch (error) {
        console.error('Ошибка загрузки билетов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchForms, setLoading]);

  const handleSearch = async (filters: { name?: string; email?: string }) => {
    setLoading(true);

    try {
      // Формируем объект с фильтрами, исключая пустые значения
      const sanitizedFilters: Record<string, string | number> = {};

      if (filters.name) {
        sanitizedFilters.name = filters.name;
      }
      if (filters.email) {
        sanitizedFilters.email = filters.email;
      }

      // Вызываем fetchTickets с очищенными фильтрами
      await fetchForms({ ...sanitizedFilters });
    } catch (error) {
      console.error('Ошибка фильтрации формы:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    try {
      await fetchForms();
    } catch (error) {
      console.error('Ошибка загрузки формы:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Наименование', flex: 1 },
    { field: 'phone', headerName: 'Номер телефона', flex: 1 },
    { field: 'email', headerName: 'Почта', flex: 1 },
    { field: 'comment', headerName: 'Комментарий', flex: 1.5 },
    { field: '$id', headerName: 'ID', flex: 1, sortable: false },

    {
      field: 'status',
      headerName: 'Статус',
      flex: 1,
      renderCell: () => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <div>
      <Title text='Формы' />
      <Stack
        direction='row'
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Button
          onClick={() => setActiveFilter((prev) => !prev)}
          variant='contained'
          color='secondary'
        >
          {activeFilter ? 'Скрыть фильтр' : 'Показать фильтр'}
        </Button>
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <FormFilter
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </motion.div>
        )}
      </Stack>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={forms ? forms : []}
          columns={columns}
          getRowId={(row) => row.$id}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableColumnFilter
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          isCellEditable={() => false}
          disableRowSelectionOnClick
          density='comfortable'
        />
      </Box>
    </div>
  );
};

export default Forms;
