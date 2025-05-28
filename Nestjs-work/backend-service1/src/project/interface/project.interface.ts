import { Document } from 'mongoose';

export interface IProject extends Document {

  readonly name: string;

  readonly description: string;

  readonly imageUrl: string;

  readonly contractTypeId: number;

  readonly contractSignedOn: Date;

  readonly budget: number;

  readonly isActive: boolean;
}