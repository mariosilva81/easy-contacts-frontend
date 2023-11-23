import { z } from 'zod';

export const createFormSchema = z.object({
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
  client_id: z.string().min(1, 'O ID do cliente é obrigatório.').optional(),
});

export type TCreateFormValues = z.infer<typeof createFormSchema>;
