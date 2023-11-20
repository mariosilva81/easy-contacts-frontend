import { z } from 'zod';

export const editFormSchema = z.object({
  full_name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .regex(/[A-Z]/, 'O nome deve conter pelo menos uma letra maiúscula.')
    .regex(/\s/, 'É necessário nome e sobrenome'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('O e-mail fornecido é inválido.'),
  phone: z
    .string()
    .min(
      11,
      'O telefone precisa conter pelo menos 11 caracteres. Ex.: 00123456789',
    ),
});

export type TEditFormValues = z.infer<typeof editFormSchema>;
