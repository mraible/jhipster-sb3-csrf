import dayjs from 'dayjs/esm';
import { IDocumentBankAccount } from 'app/entities/document-bank-account/document-bank-account.model';

export interface IEmbeddedOperation {
  date?: dayjs.Dayjs | null;
  description?: string | null;
  amount?: number | null;
  documentBankAccount?: Pick<IDocumentBankAccount, 'id' | 'name'> | null;
}
