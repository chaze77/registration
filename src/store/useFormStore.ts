import { create } from 'zustand';
import { fetchDocuments, updateDocument } from '@/utils/api';
import { Query } from 'appwrite';
import showMessage from '@/hooks/useNotify';
import { IForm } from '@/types';
import messages from '@/constants/messages';

type FormState = {
  forms: IForm[] | null;
  fetchForms: (filters?) => Promise<void>;
  update: (id: string, formState: { name: string }) => Promise<void>;
};

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_FORM_COLLECTION_ID;

const useFormStore = create<FormState>((set) => ({
  forms: null,

  fetchForms: async (filters?: { email?: string; name?: string }) => {
    try {
      const queryFilters: string[] = [];

      // Добавляем фильтр по email, если он указан
      if (filters?.email) {
        queryFilters.push(Query.equal('email', [filters.email]));
      }

      // Добавляем фильтр по name, если он указан
      if (filters?.name) {
        queryFilters.push(Query.equal('name', [filters.name]));
      }

      // Выполняем запрос с фильтрами
      const documents = await fetchDocuments<IForm>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );

      // Обновляем состояние с загруженными документами
      set({ forms: documents });
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

export default useFormStore;
