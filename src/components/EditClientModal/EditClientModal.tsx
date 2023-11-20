import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyles } from '../../styles/form';
import { StyledHeadline3, StyledParagraph } from '../../styles/typography';
import { StyledClientModal } from './style';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { StyledButton } from '../../styles/buttons';
import { useState } from 'react';
import { useOutClick } from '../../hooks/useOutClick';
import { useKeydownPress } from '../../hooks/useKeydownPress';
import { TEditFormValues, editFormSchema } from '../../schemas/editFormSchema';
import { useClientContext } from '../../providers/ClientContext';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

const EditClientModal = () => {
  const {
    client,
    setClient,
    setIsEditClientModal,
    setIsRemoveClientModal,
    setIsEditClientPasswordModal,
  } = useClientContext();
  const [loading, setLoading] = useState(false);

  const clientToken = localStorage.getItem('@TOKEN');

  const modalRef = useOutClick(() => closeModals());
  const buttonRef = useKeydownPress('Escape', (element) => element?.click());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      full_name: client!.full_name,
      email: client!.email,
      phone: client!.phone,
    },
  });

  const editClient = async (formData: TEditFormValues) => {
    try {
      setLoading(true);
      const { data } = await api.patch(`/clients/${client!.id}`, formData, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      setClient(data);

      toast.success('Cliente atualizado com sucesso.', {
        className: 'toast-sucess',
      });
    } catch (error: any) {
      toast.error('Oops! Algo deu errado.', {
        className: 'toast-error',
      });
    } finally {
      setIsEditClientModal(false);
      setLoading(false);
    }
  };

  const submit: SubmitHandler<TEditFormValues> = async (formData) => {
    await editClient(formData);
    reset();
  };

  const handleDeleteModal = () => {
    setIsEditClientModal(false);
    setIsEditClientPasswordModal(false);
    setIsRemoveClientModal(true);
  };

  const handleEditPasswordModal = () => {
    setIsEditClientModal(false);
    setIsRemoveClientModal(false);
    setIsEditClientPasswordModal(true);
  };

  const closeModals = () => {
    setIsEditClientModal(false);
    setIsEditClientPasswordModal(false);
    setIsRemoveClientModal(false);
  };

  return (
    <div className="modalOverlay" role="dialog">
      <StyledClientModal ref={modalRef}>
        <header>
          <StyledHeadline3 fontweight="bold" fontsize="small">
            Detalhes do Cliente
          </StyledHeadline3>
          <StyledParagraph
            fontweight="bold"
            color="gray"
            ref={buttonRef}
            onClick={() => closeModals()}
          >
            X
          </StyledParagraph>
        </header>
        <FormStyles onSubmit={handleSubmit(submit)} radius="none">
          <Input
            type="text"
            label="Nome"
            disabled={loading}
            error={errors.full_name}
            {...register('full_name')}
          />
          <Input
            type="email"
            label="E-mail"
            disabled={loading}
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="text"
            label="Telefone"
            disabled={loading}
            error={errors.phone}
            {...register('phone')}
          />
          <div className="buttons-container">
            {Object.keys(errors).length !== 0 ? (
              <StyledButton
                buttonsize="big"
                buttonstyle="invalid"
                disabled={true}
              >
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </StyledButton>
            ) : (
              <StyledButton
                buttonsize="big"
                buttonstyle="primary"
                disabled={false}
              >
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </StyledButton>
            )}
            <StyledButton
              type="button"
              buttonsize="big"
              buttonstyle="register"
              disabled={loading}
              onClick={() => handleEditPasswordModal()}
            >
              Editar Senha
            </StyledButton>
            <StyledButton
              type="button"
              buttonsize="big"
              buttonstyle="danger"
              disabled={loading}
              onClick={() => handleDeleteModal()}
            >
              Excluir cliente
            </StyledButton>
          </div>
        </FormStyles>
      </StyledClientModal>
    </div>
  );
};

export default EditClientModal;
