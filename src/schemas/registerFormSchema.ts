import { z } from 'zod';

export const registerFormSchema = z
  .object({
    full_name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .regex(/[A-Z]/, 'O nome deve conter pelo menos uma letra maiúscula.')
      .regex(/\s/, 'É necessário nome e sobrenome'),
    email: z
      .string()
      .min(1, 'O e-mail é obrigatório.')
      .email('O e-mail fornecido é inválido.'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
      .regex(
        /[^a-zA-Z0-9]/,
        'A senha deve conter pelo menos um caractere especial.',
      ),
    confirm: z.string().min(8, 'A confirmação da senha é obrigatória.'),
    phone: z
      .string()
      .min(
        11,
        'O telefone precisa conter pelo menos 11 caracteres. Ex.: 00123456789',
      ),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'As senhas não correspondem.',
    path: ['confirm'],
  });

export type TRegisterFormValues = z.infer<typeof registerFormSchema>;
