import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentBankAccount } from '../document-bank-account.model';
import { DocumentBankAccountService } from '../service/document-bank-account.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './document-bank-account-delete-dialog.component.html',
})
export class DocumentBankAccountDeleteDialogComponent {
  documentBankAccount?: IDocumentBankAccount;

  constructor(protected documentBankAccountService: DocumentBankAccountService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.documentBankAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
