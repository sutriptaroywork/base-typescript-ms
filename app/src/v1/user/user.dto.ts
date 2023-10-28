import { z } from 'zod';

import { Responses } from '../../../enums/responses';

export const createSchema = z
  .object({
    username: z.string({
      required_error: Responses.USERNAME_REQUIRED,
      invalid_type_error: Responses.USERNAME_TYPE_ERROR,
    }),
    password: z.string({
      required_error: Responses.PASSWORD_REQUIRED,
      invalid_type_error: Responses.PASSWORD_TYPE_ERROR,
    }),
  })
  .strict({
    message: Responses.REQUEST_PAYLOAD_NOT_MATCHED,
  });

export type UserCreate = z.infer<typeof createSchema>;

export const createWithOTPSchema = z
  .object({
    contact: z.number({
      required_error: Responses.CONTACT_REQUIRED,
      invalid_type_error: Responses.CONTACT_TYPE_ERROR,
    }),
  })
  .strict({
    message: Responses.REQUEST_PAYLOAD_NOT_MATCHED,
  });

export type UserCreateWithOTP = z.infer<typeof createWithOTPSchema>;

export const identitySchema = z
  .object({
    id: z.string({
      required_error: Responses.ID_REQUIRED,
      invalid_type_error: Responses.ID_TYPE_ERROR,
    }),
  })
  .strict({
    message: Responses.REQUEST_PAYLOAD_NOT_MATCHED,
  });

export type UserIdentity = z.infer<typeof identitySchema>;

export const userUpdationSchema = z.object({
  email_id: z
    .string({
      required_error: Responses.EMAIL_ID_REQUIRED,
      invalid_type_error: Responses.EMAIL_ID_TYPE_ERROR,
    })
    .email({
      message: Responses.EMAIL_ID_FORMAT_ERROR,
    }),
});

export type UserUpdation = z.infer<typeof userUpdationSchema>;

export const userMetaUpdationSchema = z.object({
  name: z
    .string({
      invalid_type_error: Responses.NAME_TYPE_ERROR,
    })
    .optional(),
  city: z
    .string({
      invalid_type_error: Responses.CITY_TYPE_ERROR,
    })
    .optional(),
  image_url: z
    .string({
      invalid_type_error: Responses.IMAGE_URL_TYPE_ERROR,
    })
    .optional(),
});

export type UserMetaUpdation = z.infer<typeof userMetaUpdationSchema>;

export const userDetailsResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email_id: z.string().nullish(),
  status: z.string(),
});

export type UserDetailsResponse = z.infer<typeof userDetailsResponseSchema>;
