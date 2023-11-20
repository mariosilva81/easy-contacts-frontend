import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api.ts';
import { toast } from 'react-toastify';
import { TEditFormValues } from '../schemas/editFormSchema';
import {
  Contact,
  IClientContextProviderProps,
  IContactAddResponse,
  IContactContext,
} from './@types';
import { useClientContext } from './ClientContext';

export const ContactsContext = createContext({} as IContactContext);

export const ContactsContextProvider = ({
  children,
}: IClientContextProviderProps) => {
  const { client } = useClientContext();
  const [contactsList, setContactsList] = useState<Contact[] | []>([]);
  const [updatedContact, setUpdatedContact] = useState<Contact | null>(null);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const clientToken = localStorage.getItem('@TOKEN');

  useEffect(() => {
    if (client) {
      setContactsList([...client.contacts!]);
    }
  }, []);

  const addContact = async (
    formData: TEditFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IContactAddResponse>(
        `/contacts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        },
      );
      setContactsList((contactsList) => [...contactsList, data]);

      toast.success('Contato criado com sucesso.', {
        className: 'toast-sucess',
      });
    } catch (error: any) {
      toast.error(`$${error.message}`, {
        className: 'toast-error',
      });
    } finally {
      setLoading(false);
      setIsAddModal(false);
    }
  };

  const removeContact = async (
    contactId: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      const filteredContactsList = contactsList.filter(
        (contact) => contact.id !== contactId,
      );
      setContactsList(filteredContactsList);

      toast.success('Contato excluído com sucesso.', {
        className: 'toast-sucess',
      });
    } catch (error) {
      toast.error('Oops! Algo deu errado.', {
        className: 'toast-error',
      });
    } finally {
      setIsEditModal(false);
      setLoading(false);
      setUpdatedContact(null);
    }
  };

  const editContact = async (
    contactId: string,
    formData: TEditFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      const { data } = await api.patch<IContactAddResponse>(
        `/contacts/${contactId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        },
      );

      const newContactsList = contactsList.map((foundedContact) => {
        if (foundedContact.id === contactId) {
          return { ...data };
        } else {
          return foundedContact;
        }
      });

      setContactsList(newContactsList);

      toast.success('Contato atualizado com sucesso.', {
        className: 'toast-sucess',
      });
    } catch (error: any) {
      toast.error('Oops! Algo deu errado.', {
        className: 'toast-error',
      });
      console.error(error.message);
    } finally {
      setIsEditModal(false);
      setLoading(false);
      setUpdatedContact(null);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        addContact,
        editContact,
        removeContact,
        isAddModal,
        isEditModal,
        setIsAddModal,
        setIsEditModal,
        setUpdatedContact,
        updatedContact,
        contactsList,
        setContactsList,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => useContext(ContactsContext);
