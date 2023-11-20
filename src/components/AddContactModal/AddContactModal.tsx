import { zodResolver } from '@hookform/resolvers/zod';
import { FormStyles } from '../../styles/form';
import { StyledHeadline3, StyledParagraph } from '../../styles/typography';
import { StyledContactsModal } from './style';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TEditFormValues, editFormSchema } from '../../schemas/editFormSchema';
import Input from '../Input/Input';
import { StyledButton } from '../../styles/buttons';
import { useContactsContext } from '../../providers/ContactContext';
import { useState } from 'react';
import { useOutClick } from '../../hooks/useOutClick';
import { useKeydownPress } from '../../hooks/useKeydownPress';

const AddContactsModal = () => {
  const [loading, setLoading] = useState(false);
  const { addContact, setIsAddModal } = useContactsContext();

  const modalRef = useOutClick(() => setIsAddModal(false));
  const buttonRef = useKeydownPress('Escape', (element) => element?.click());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEditFormValues>({
    resolver: zodResolver(editFormSchema),
  });

  const submit: SubmitHandler<TEditFormValues> = async (formData) => {
    await addContact(formData, setLoading);
    reset();
  };

  return (
    <div className="modalOverlay" role="dialog">
      <StyledContactsModal ref={modalRef}>
        <header>
          <StyledHeadline3 fontweight="bold" fontsize="small">
            Cadastrar Contato
          </StyledHeadline3>
          <StyledParagraph
            fontweight="bold"
            color="gray"
            ref={buttonRef}
            onClick={() => setIsAddModal(false)}
          >
            X
          </StyledParagraph>
        </header>
        <FormStyles onSubmit={handleSubmit(submit)} radius="none">
          <Input
            type="text"
            placeholder="Digite o nome completo"
            label="Nome"
            error={errors.full_name}
            disabled={loading}
            {...register('full_name')}
          />
          <Input
            type="email"
            placeholder="Digite o e-mail"
            label="E-mail"
            error={errors.email}
            disabled={loading}
            {...register('email')}
          />
          <Input
            type="text"
            placeholder="Digite o telefone"
            label="Telefone"
            error={errors.phone}
            disabled={loading}
            {...register('phone')}
          />
          {Object.keys(errors).length !== 0 ? (
            <StyledButton
              buttonsize="big"
              buttonstyle="invalid"
              disabled={true}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </StyledButton>
          ) : (
            <StyledButton
              buttonsize="big"
              buttonstyle="primary"
              disabled={false}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </StyledButton>
          )}
        </FormStyles>
      </StyledContactsModal>
    </div>
  );
};

export default AddContactsModal;