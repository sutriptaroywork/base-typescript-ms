import mongoose, { Schema } from 'mongoose';

import { LoginStatus } from '../../enums/common';

interface LoginLogsAttributes {
  userId: number;
  loginDeviceId: string;
  loginIp: string;
  loginMethod: string;
  status: LoginStatus;
  createdAt: Date;
}

export interface LoginLogsModelInput extends Omit<LoginLogsAttributes, '_id' | 'createdAt'> {}
export interface LoginLogsModelOutput extends Required<LoginLogsAttributes> {}

const LoginLogsSchema = new Schema<LoginLogsAttributes>(
  {
    userId: {
      type: Number,
      required: true,
    },
    loginDeviceId: {
      type: String,
      required: true,
    },
    loginIp: {
      type: String,
      required: true,
    },
    loginMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: LoginStatus,
      default: LoginStatus.SUCCESSFUL,
    },
  },
  { timestamps: { createdAt: 'createdAt' } },
);

const LoginLogsModel = mongoose.model('loginLogs', LoginLogsSchema);

export default LoginLogsModel;
