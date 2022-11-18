import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DocumentBankAccountComponent } from './list/document-bank-account.component';
import { DocumentBankAccountDetailComponent } from './detail/document-bank-account-detail.component';
import { DocumentBankAccountUpdateComponent } from './update/document-bank-account-update.component';
import { DocumentBankAccountDeleteDialogComponent } from './delete/document-bank-account-delete-dialog.component';
import { DocumentBankAccountRoutingModule } from './route/document-bank-account-routing.module';

@NgModule({
  imports: [SharedModule, DocumentBankAccountRoutingModule],
  declarations: [
    DocumentBankAccountComponent,
    DocumentBankAccountDetailComponent,
    DocumentBankAccountUpdateComponent,
    DocumentBankAccountDeleteDialogComponent,
  ],
})
export class DocumentBankAccountModule {}
