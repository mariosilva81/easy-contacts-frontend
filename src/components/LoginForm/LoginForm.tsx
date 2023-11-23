import { FormStyles } from '../../styles/form';
import GridLoader from 'react-spinners/GridLoader';
import Eye from '../../assets/eye.svg';
import { StyledHeadline1 } from '../../styles/typography';
import Input from '../Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TLoginFormValues,
  loginFormSchema,
} from '../../schemas/loginFormSchema';
import { StyledLoaderContainer } from '../../styles/grid';
import { StyledButton, StyledLink } from '../../styles/buttons';
import { useClientContext } from '../../providers/ClientContext';
import { useState } from 'react';

const LoginForm = () => {
  const { clientLogin } = useClientContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const submit: SubmitHandler<TLoginFormValues> = async (formData) => {
    await clientLogin(formData, setLoading);
    reset();
  };

  const handleChangeInput = () => {
    const input = document.querySelector('#password') as HTMLElement;
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
  };

  return (
    <>
      {loading ? (
        <StyledLoaderContainer>
          <GridLoader color="#4588E6" />
        </StyledLoaderContainer>
      ) : (
        <FormStyles onSubmit={handleSubmit(submit)} noValidate>
          <StyledHeadline1 fontweight="bold" fontsize="big">
            Login
          </StyledHeadline1>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            label="E-mail"
            error={errors.email}
            disabled={loading}
            {...register('email')}
          />
          <div className="password-container">
            <Input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              label="Senha"
              error={errors.password}
              disabled={loading}
              {...register('password')}
            />
            <img
              src={Eye}
              alt="Button to see password"
              className="eye-button"
              onClick={handleChangeInput}
            />
          </div>
          {Object.keys(errors).length !== 0 ? (
            <StyledButton
              buttonsize="big"
              buttonstyle="invalid"
              disabled={true}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </StyledButton>
          ) : (
            <StyledButton
              buttonsize="big"
              buttonstyle="primary"
              disabled={false}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </StyledButton>
          )}
          <div className="register">
            <StyledLink to="/register" buttonsize="big" buttonstyle="register">
              Cadastre-se
            </StyledLink>
          </div>
        </FormStyles>
      )}
    </>
  );
};

export default LoginForm;
