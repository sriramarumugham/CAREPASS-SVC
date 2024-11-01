import mongoose, { Schema } from 'mongoose';
import { AdminDocument, AdminRole, AdminStatus } from '../../types/admin.types';

const AdminSchema: Schema<AdminDocument> = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(AdminStatus),
    default: AdminStatus.ACTIVE,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(AdminRole), required: true }, // New field for role
});

const AdminModel = mongoose.model<AdminDocument>('Admin', AdminSchema);
export default AdminModel;
