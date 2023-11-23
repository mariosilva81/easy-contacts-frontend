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
import {
  TCreateFormValues,
  createFormSchema,
} from '../../schemas/createFormSchema';

const AddContactsModal = () => {
  const [loading, setLoading] = useState(false);
  const { addContact, setIsAddModal } = useContactsContext();
  const clientId = localStorage.getItem('@CLIENT_ID')!;

  const modalRef = useOutClick(() => setIsAddModal(false));
  const buttonRef = useKeydownPress('Escape', (element) => element?.click());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateFormValues>({
    resolver: zodResolver(createFormSchema),
  });

  const submit: SubmitHandler<TCreateFormValues> = async (formData) => {
    formData.client_id = clientId;
    await addContact(formData, setLoading);
    reset();
  };

  const hasErrors = Object.keys(errors).length !== 0;

  return (
    <div className="modalOverlay" role="dialog">
      <StyledContactsModal ref={modalRef}>
        <header>
          <StyledHeadline3 fontweight="bold" fontsize="small">
            Cadastrar contato
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
            label="Nome completo"
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
          <StyledButton
            type="submit"
            buttonsize="big"
            buttonstyle={hasErrors ? 'invalid' : 'primary'}
            disabled={loading || hasErrors}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </StyledButton>
        </FormStyles>
      </StyledContactsModal>
    </div>
  );
};

export default AddContactsModal;
