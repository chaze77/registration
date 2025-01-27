import { create } from 'zustand';
import { fetchDocuments, updateDocument } from '@/utils/api';
import { Query } from 'appwrite';
import showMessage from '@/hooks/useNotify';

import messages from '@/constants/messages';
import { IMuseum } from '@/types';
type Filters = {
  name?: string;
  $id?: string;
};

type MesumState = {
  museums: IMuseum[] | null;
  fetchInfo: (filters?: Filters) => Promise<void>;
  update: (id: string, formState: { name: string }) => Promise<void>;
};

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_MUSEUMS_COLLECTION_ID;

const useMuseumStore = create<MesumState>((set) => ({
  museums: null,

  fetchInfo: async (filters?: { name?: string; $id?: string }) => {
    try {
      const queryFilters: string[] = [];

      if (filters?.name) {
        queryFilters.push(Query.contains('name', [filters.name]));
      }

      if (filters?.$id) {
        queryFilters.push(Query.equal('$id', [filters.$id]));
      }
      console.log('queryFilters', queryFilters);

      // Выполняем запрос с фильтрами
      const documents = await fetchDocuments<IMuseum>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );

      // Обновляем состояние с загруженными документами
      set({ museums: documents });
    } catch (error) {
      console.error('Ошибка при загрузке информации:', error);
    }
  },

  update: async (id: string, formState: { name: string }) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      showMessage('success', messages.general.updatedSuccess);
    } catch (error) {
      console.error('Ошибка при обновлении инфо:', error);
      showMessage('error', messages.general.unexpectedError);
    }
  },
}));

export default useMuseumStore;
