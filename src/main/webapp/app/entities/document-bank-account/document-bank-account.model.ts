import dayjs from 'dayjs/esm';
import { BankAccountType } from 'app/entities/enumerations/bank-account-type.model';

export interface IDocumentBankAccount {
  id: string;
  name?: string | null;
  bankNumber?: number | null;
  agencyNumber?: number | null;
  lastOperationDuration?: number | null;
  meanOperationDuration?: number | null;
  balance?: number | null;
  openingDay?: dayjs.Dayjs | null;
  lastOperationDate?: dayjs.Dayjs | null;
  active?: boolean | null;
  accountType?: BankAccountType | null;
  attachment?: string | null;
  attachmentContentType?: string | null;
  description?: string | null;
}

export type NewDocumentBankAccount = Omit<IDocumentBankAccount, 'id'> & { id: null };
