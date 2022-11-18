import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDocumentBankAccount, NewDocumentBankAccount } from '../document-bank-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocumentBankAccount for edit and NewDocumentBankAccountFormGroupInput for create.
 */
type DocumentBankAccountFormGroupInput = IDocumentBankAccount | PartialWithRequiredKeyOf<NewDocumentBankAccount>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDocumentBankAccount | NewDocumentBankAccount> = Omit<T, 'lastOperationDate'> & {
  lastOperationDate?: string | null;
};

type DocumentBankAccountFormRawValue = FormValueOf<IDocumentBankAccount>;

type NewDocumentBankAccountFormRawValue = FormValueOf<NewDocumentBankAccount>;

type DocumentBankAccountFormDefaults = Pick<NewDocumentBankAccount, 'id' | 'lastOperationDate' | 'active'>;

type DocumentBankAccountFormGroupContent = {
  id: FormControl<DocumentBankAccountFormRawValue['id'] | NewDocumentBankAccount['id']>;
  name: FormControl<DocumentBankAccountFormRawValue['name']>;
  bankNumber: FormControl<DocumentBankAccountFormRawValue['bankNumber']>;
  agencyNumber: FormControl<DocumentBankAccountFormRawValue['agencyNumber']>;
  lastOperationDuration: FormControl<DocumentBankAccountFormRawValue['lastOperationDuration']>;
  meanOperationDuration: FormControl<DocumentBankAccountFormRawValue['meanOperationDuration']>;
  balance: FormControl<DocumentBankAccountFormRawValue['balance']>;
  openingDay: FormControl<DocumentBankAccountFormRawValue['openingDay']>;
  lastOperationDate: FormControl<DocumentBankAccountFormRawValue['lastOperationDate']>;
  active: FormControl<DocumentBankAccountFormRawValue['active']>;
  accountType: FormControl<DocumentBankAccountFormRawValue['accountType']>;
  attachment: FormControl<DocumentBankAccountFormRawValue['attachment']>;
  attachmentContentType: FormControl<DocumentBankAccountFormRawValue['attachmentContentType']>;
  description: FormControl<DocumentBankAccountFormRawValue['description']>;
};

export type DocumentBankAccountFormGroup = FormGroup<DocumentBankAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentBankAccountFormService {
  createDocumentBankAccountFormGroup(documentBankAccount: DocumentBankAccountFormGroupInput = { id: null }): DocumentBankAccountFormGroup {
    const documentBankAccountRawValue = this.convertDocumentBankAccountToDocumentBankAccountRawValue({
      ...this.getFormDefaults(),
      ...documentBankAccount,
    });
    return new FormGroup<DocumentBankAccountFormGroupContent>({
      id: new FormControl(
        { value: documentBankAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(documentBankAccountRawValue.name, {
        validators: [Validators.required],
      }),
      bankNumber: new FormControl(documentBankAccountRawValue.bankNumber),
      agencyNumber: new FormControl(documentBankAccountRawValue.agencyNumber),
      lastOperationDuration: new FormControl(documentBankAccountRawValue.lastOperationDuration),
      meanOperationDuration: new FormControl(documentBankAccountRawValue.meanOperationDuration),
      balance: new FormControl(documentBankAccountRawValue.balance, {
        validators: [Validators.required],
      }),
      openingDay: new FormControl(documentBankAccountRawValue.openingDay),
      lastOperationDate: new FormControl(documentBankAccountRawValue.lastOperationDate),
      active: new FormControl(documentBankAccountRawValue.active),
      accountType: new FormControl(documentBankAccountRawValue.accountType),
      attachment: new FormControl(documentBankAccountRawValue.attachment),
      attachmentContentType: new FormControl(documentBankAccountRawValue.attachmentContentType),
      description: new FormControl(documentBankAccountRawValue.description),
    });
  }

  getDocumentBankAccount(form: DocumentBankAccountFormGroup): IDocumentBankAccount | NewDocumentBankAccount {
    return this.convertDocumentBankAccountRawValueToDocumentBankAccount(
      form.getRawValue() as DocumentBankAccountFormRawValue | NewDocumentBankAccountFormRawValue
    );
  }

  resetForm(form: DocumentBankAccountFormGroup, documentBankAccount: DocumentBankAccountFormGroupInput): void {
    const documentBankAccountRawValue = this.convertDocumentBankAccountToDocumentBankAccountRawValue({
      ...this.getFormDefaults(),
      ...documentBankAccount,
    });
    form.reset(
      {
        ...documentBankAccountRawValue,
        id: { value: documentBankAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DocumentBankAccountFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastOperationDate: currentTime,
      active: false,
    };
  }

  private convertDocumentBankAccountRawValueToDocumentBankAccount(
    rawDocumentBankAccount: DocumentBankAccountFormRawValue | NewDocumentBankAccountFormRawValue
  ): IDocumentBankAccount | NewDocumentBankAccount {
    return {
      ...rawDocumentBankAccount,
      lastOperationDate: dayjs(rawDocumentBankAccount.lastOperationDate, DATE_TIME_FORMAT),
    };
  }

  private convertDocumentBankAccountToDocumentBankAccountRawValue(
    documentBankAccount: IDocumentBankAccount | (Partial<NewDocumentBankAccount> & DocumentBankAccountFormDefaults)
  ): DocumentBankAccountFormRawValue | PartialWithRequiredKeyOf<NewDocumentBankAccountFormRawValue> {
    return {
      ...documentBankAccount,
      lastOperationDate: documentBankAccount.lastOperationDate ? documentBankAccount.lastOperationDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
