import dayjs from 'dayjs/esm';

import { BankAccountType } from 'app/entities/enumerations/bank-account-type.model';

import { IDocumentBankAccount, NewDocumentBankAccount } from './document-bank-account.model';

export const sampleWithRequiredData: IDocumentBankAccount = {
  id: 'd2381986-52a6-4cdc-9001-5b15adaa4ce8',
  name: 'Atlanta Direct',
  balance: 87414,
};

export const sampleWithPartialData: IDocumentBankAccount = {
  id: 'cb0ddb6d-1749-471a-ab6f-7ed8933d93c6',
  name: 'Hybrid Customer',
  bankNumber: 51796,
  lastOperationDuration: 42159,
  balance: 9996,
  lastOperationDate: dayjs('2015-08-04T16:56'),
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDocumentBankAccount = {
  id: 'cd323ea9-15ff-40c3-888c-0f823d289cfb',
  name: 'scalable plum EXE',
  bankNumber: 73032,
  agencyNumber: 79997,
  lastOperationDuration: 65690,
  meanOperationDuration: 74012,
  balance: 37989,
  openingDay: dayjs('2015-08-04'),
  lastOperationDate: dayjs('2015-08-04T21:17'),
  active: true,
  accountType: BankAccountType['CHECKING'],
  attachment: '../fake-data/blob/hipster.png',
  attachmentContentType: 'unknown',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDocumentBankAccount = {
  name: 'Bicycle intranet',
  balance: 68238,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
