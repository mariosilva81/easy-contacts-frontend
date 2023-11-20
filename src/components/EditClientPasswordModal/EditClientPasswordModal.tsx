import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useKeydownPress } from '../../hooks/useKeydownPress';
import { useOutClick } from '../../hooks/useOutClick';
import { useClientContext } from '../../providers/ClientContext';
import {
  TEditClientPasswordForm,
  editClientPasswordFormSchema,
} from '../../schemas/editClientPasswordFormSchema';
import { api } from '../../services/api';
import { StyledButton } from '../../styles/buttons';
import { FormStyles } from '../../styles/form';
import { StyledHeadline3, StyledParagraph } from '../../styles/typography';
import { StyledClientModal } from '../EditClientModal/style';
import Input from '../Input/Input';

const EditClientPasswordModal = () => {
  const {
    client,
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
  } = useForm<TEditClientPasswordForm>({
    resolver: zodResolver(editClientPasswordFormSchema),
  });

  const editClientPassword = async (formData: TEditClientPasswordForm) => {
    try {
      setLoading(true);
      await api.patch(`/clients/${client!.id}`, formData, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

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

  const submit: SubmitHandler<TEditClientPasswordForm> = async (formData) => {
    await editClientPassword(formData);
    reset();
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
            Editar Cliente
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
            type="password"
            id="password"
            placeholder="Digite sua senha"
            label="Senha"
            error={errors.password}
            disabled={loading}
            {...register('password')}
          />
          <Input
            type="password"
            id="confirm"
            placeholder="Digite novamente sua senha"
            label="Confirmar Senha"
            error={errors.confirm}
            disabled={loading}
            {...register('confirm')}
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
              onClick={() => closeModals()}
            >
              Voltar
            </StyledButton>
          </div>
        </FormStyles>
      </StyledClientModal>
    </div>
  );
};

export default EditClientPasswordModal;
