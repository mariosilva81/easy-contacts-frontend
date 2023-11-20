import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TRegisterFormValues } from '../schemas/registerFormSchema';
import { TLoginFormValues } from '../schemas/loginFormSchema';
import {
  Client,
  IClientContext,
  IClientContextProviderProps,
  IClientWithToken,
} from './@types';

export const ClientContext = createContext({} as IClientContext);

export const ClientContextProvider = ({
  children,
}: IClientContextProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const [isEditClientModal, setIsEditClientModal] = useState(false);
  const [isEditClientPasswordModal, setIsEditClientPasswordModal] =
    useState(false);
  const [isRemoveClientModal, setIsRemoveClientModal] = useState(false);

  const navigate = useNavigate();

  const currentPath = useMemo(() => window.location.pathname, []);
  const clientToken = localStorage.getItem('@TOKEN');
  const clientId = localStorage.getItem('@CLIENT_ID');

  useEffect(() => {
    const loadClient = async () => {
      try {
        setGlobalLoading(true);
        const { data } = await api.get<Client>(`/clients/${clientId}`, {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        });
        setClient(data);
        navigate(currentPath);
      } catch (error) {
        handleLogout();
      } finally {
        setGlobalLoading(false);
      }
    };

    if (clientToken && clientId) {
      loadClient();
    }
  }, []);

  const clientLogin = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IClientWithToken>('/sessions/login', formData);
      setClient(data.client);
      localStorage.setItem('@TOKEN', data.access_token);
      localStorage.setItem('@CLIENT_ID', data.client.id);
      navigate(`/dashboard`);
    } catch (error) {
      toast.error('Cliente não encontrado. Por favor, tente novamente.', {
        className: 'toast-error',
      });
    } finally {
      setLoading(false);
    }
  };

  const clientRegister = async (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      setLoading(true);
      await api.post<Client>('/clients', formData);
      toast.success('Cliente cadastrado com sucesso.', {
        className: 'toast-sucess',
      });
      navigate('/');
    } catch (error) {
      toast.error('Oops! Algo deu errado.', {
        className: 'toast-error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@CLIENT_ID');
    setClient(null);
    navigate('/');
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        globalLoading,
        clientLogin,
        clientRegister,
        handleLogout,
        setGlobalLoading,
        isEditClientModal,
        setIsEditClientModal,
        isRemoveClientModal,
        setIsRemoveClientModal,
        isEditClientPasswordModal,
        setIsEditClientPasswordModal,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
