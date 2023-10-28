import { z } from 'zod';

import { Responses } from '../../../enums/responses';

export const createSchema = z
  .object({
    userId: z.number({
      required_error: Responses.USER_ID_REQUIRED,
      invalid_type_error: Responses.USER_ID_TYPE_ERROR,
    }),
    loginDeviceId: z.string({
      required_error: Responses.LOGIN_DEVICE_ID_REQUIRED,
      invalid_type_error: Responses.LOGIN_DEVICE_ID_TYPE_ERROR,
    }),
    loginIp: z.string({
      required_error: Responses.LOGIN_IP_REQUIRED,
      invalid_type_error: Responses.LOGIN_IP_TYPE_ERROR,
    }),
    loginMethod: z.string({
      required_error: Responses.LOGIN_METHOD_REQUIRED,
      invalid_type_error: Responses.LOGIN_METHOD_TYPE_ERROR,
    }),
    status: z.string({
      required_error: Responses.STATUS_REQUIRED,
      invalid_type_error: Responses.STATUS_TYPE_ERROR,
    }),
  })
  .strict({
    message: Responses.REQUEST_PAYLOAD_NOT_MATCHED,
  });

export type LoginLogsCreate = z.infer<typeof createSchema>;

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

export type LoginLogsIdentity = z.infer<typeof identitySchema>;

export const loginLogsCreationResponseSchema = z.object({
  userId: z.number(),
  loginDeviceId: z.string(),
  loginIp: z.string(),
  loginMethod: z.string(),
  status: z.string(),
  createdAt: z.date(),
});

export type LoginLogsCreationResponse = z.infer<typeof loginLogsCreationResponseSchema>;

export const loginLogsDetailsResponseSchema = z.array(
  z.object({
    userId: z.number(),
    loginDeviceId: z.string(),
    loginIp: z.string(),
    loginMethod: z.string(),
    status: z.string(),
    createdAt: z.date(),
  }),
);

export type LoginLogsDetailsResponse = z.infer<typeof loginLogsDetailsResponseSchema>;
