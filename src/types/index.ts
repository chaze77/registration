export interface IBaseDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface IForm extends IBaseDocument {
  name: string;
  email: string;
  phone: string;
  comment: string;
  status: string;
}

export interface User {
  email: string;
  labels?: string[];
  name?: string;
  [key: string]: any;
}

export interface IMuseum extends IBaseDocument {
  name: string;
  tikect_info: string;
  address: string;
}
