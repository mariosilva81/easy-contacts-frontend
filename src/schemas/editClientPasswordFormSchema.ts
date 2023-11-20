import { z } from 'zod';

export const editClientPasswordFormSchema = z.object({
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
});

export type TEditClientPasswordForm = z.infer<
  typeof editClientPasswordFormSchema
>;
