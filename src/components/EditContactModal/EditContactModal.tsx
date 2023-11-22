import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyles } from '../../styles/form';
import { StyledHeadline3, StyledParagraph } from '../../styles/typography';
import { StyledContactsModal } from './style';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { StyledButton } from '../../styles/buttons';
import { useContactsContext } from '../../providers/ContactContext';
import { useState } from 'react';
import { useOutClick } from '../../hooks/useOutClick';
import { useKeydownPress } from '../../hooks/useKeydownPress';
import { TEditFormValues, editFormSchema } from '../../schemas/editFormSchema';

const EditContactsModal = () => {
  const [loading, setLoading] = useState(false);
  const { setIsEditModal, editContact, removeContact, updatedContact } =
    useContactsContext();

  const modalRef = useOutClick(() => setIsEditModal(false));
  const buttonRef = useKeydownPress('Escape', (element) => element?.click());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      full_name: updatedContact!.full_name,
      email: updatedContact!.email,
      phone: updatedContact!.phone,
    },
  });

  const submit: SubmitHandler<TEditFormValues> = async (formData) => {
    await editContact(updatedContact!.id, formData, setLoading);
    reset();
  };

  const handleDeleteContact = async (contactId: string) => {
    await removeContact(contactId, setLoading);
    reset();
  };

  return (
    <div className="modalOverlay" role="dialog">
      <StyledContactsModal ref={modalRef}>
        <header>
          <StyledHeadline3 fontweight="bold" fontsize="small">
            Detalhes do Contato
          </StyledHeadline3>
          <StyledParagraph
            fontweight="bold"
            color="gray"
            ref={buttonRef}
            onClick={() => setIsEditModal(false)}
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
                {loading ? 'Salvando...' : 'Salvar'}
              </StyledButton>
            ) : (
              <StyledButton
                buttonsize="big"
                buttonstyle="primary"
                disabled={false}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </StyledButton>
            )}
            <StyledButton
              type="button"
              buttonsize="small"
              buttonstyle="danger"
              disabled={loading}
              onClick={async () =>
                await handleDeleteContact(updatedContact!.id)
              }
            >
              Excluir
            </StyledButton>
          </div>
        </FormStyles>
      </StyledContactsModal>
    </div>
  );
};

export default EditContactsModal;
