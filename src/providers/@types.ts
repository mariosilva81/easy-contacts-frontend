import { TEditFormValues } from '../schemas/editFormSchema';
import { TLoginFormValues } from '../schemas/loginFormSchema';
import { TRegisterFormValues } from '../schemas/registerFormSchema';

export interface IContactContextProviderProps {
  children: React.ReactNode;
}

export interface Contact {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export interface IContactAddResponse {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  client: Client;
}

export interface IContactContext {
  addContact: (
    formData: TEditFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
  removeContact: (
    contactID: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
  editContact: (
    contactID: string,
    formData: TEditFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
  updatedContact: Contact | null;
  isAddModal: boolean;
  isEditModal: boolean;
  setIsAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdatedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  contactsList: [] | Contact[];
  setContactsList: React.Dispatch<React.SetStateAction<Contact[] | []>>;
}

export interface IClientContextProviderProps {
  children: React.ReactNode;
}

export interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  contacts?: Contact[];
}

export interface IClientWithToken {
  access_token: string;
  client: Client;
}

export interface IClientContext {
  client: Client | null;
  setClient: React.Dispatch<React.SetStateAction<Client | null>>;
  globalLoading: boolean;
  clientLogin: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
  clientRegister: (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
  handleLogout: () => void;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isEditClientModal: boolean;
  setIsEditClientModal: React.Dispatch<React.SetStateAction<boolean>>;
  isRemoveClientModal: boolean;
  setIsRemoveClientModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEditClientPasswordModal: boolean;
  setIsEditClientPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}
