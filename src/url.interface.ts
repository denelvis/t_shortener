import { Document } from 'mongoose';

export interface Url extends Document {
  primaryUrl: string;
  shortUrl: string;
}