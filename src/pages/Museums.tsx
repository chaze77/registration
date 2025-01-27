import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import { ruRU } from '@mui/x-data-grid/locales';

import Title from '@/components/ui/Ttitle';
import useGlobalStore from '@/store/useGlobalStore';
import useMuseumStore from '@/store/useMuseumStore';
import MuseumFilter from '@/components/filters/MuseumFilter';

const Museums = () => {
  const setLoading = useGlobalStore((state) => state.setLoading);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const { museums, fetchInfo } = useMuseumStore();

  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchInfo();
      } catch (error) {
        console.error('Ошибка загрузки музеев:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchInfo, setLoading]);

  const handleSearch = async (filters: { name?: string; $id?: string }) => {
    setLoading(true);
    try {
      const sanitizedFilters: Record<string, string> = {};
      if (filters.name) {
        sanitizedFilters.name = filters.name;
      }
      if (filters.$id) {
        sanitizedFilters.$id = filters.$id;
      }
      await fetchInfo({ ...sanitizedFilters });
    } catch (error) {
      console.error('Ошибка фильтрации музеев:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    try {
      await fetchInfo();
    } catch (error) {
      console.error('Ошибка загрузки музеев:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Наименование', flex: 1 },
    { field: 'address', headerName: 'Адрес', flex: 1 },
    { field: 'tikect_info', headerName: 'Описание', flex: 1.5 },
    { field: '$id', headerName: 'ID', flex: 1, sortable: false },
  ];

  return (
    <div>
      <Title text='Музеи' />
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
            <MuseumFilter
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </motion.div>
        )}
      </Stack>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={museums || []}
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

export default Museums;
