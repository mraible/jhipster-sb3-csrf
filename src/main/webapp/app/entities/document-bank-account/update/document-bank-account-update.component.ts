import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DocumentBankAccountFormService, DocumentBankAccountFormGroup } from './document-bank-account-form.service';
import { IDocumentBankAccount } from '../document-bank-account.model';
import { DocumentBankAccountService } from '../service/document-bank-account.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { BankAccountType } from 'app/entities/enumerations/bank-account-type.model';

@Component({
  selector: 'jhi-document-bank-account-update',
  templateUrl: './document-bank-account-update.component.html',
})
export class DocumentBankAccountUpdateComponent implements OnInit {
  isSaving = false;
  documentBankAccount: IDocumentBankAccount | null = null;
  bankAccountTypeValues = Object.keys(BankAccountType);

  editForm: DocumentBankAccountFormGroup = this.documentBankAccountFormService.createDocumentBankAccountFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected documentBankAccountService: DocumentBankAccountService,
    protected documentBankAccountFormService: DocumentBankAccountFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentBankAccount }) => {
      this.documentBankAccount = documentBankAccount;
      if (documentBankAccount) {
        this.updateForm(documentBankAccount);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('sampleWebfluxMongodbOauth2App.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentBankAccount = this.documentBankAccountFormService.getDocumentBankAccount(this.editForm);
    if (documentBankAccount.id !== null) {
      this.subscribeToSaveResponse(this.documentBankAccountService.update(documentBankAccount));
    } else {
      this.subscribeToSaveResponse(this.documentBankAccountService.create(documentBankAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentBankAccount>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(documentBankAccount: IDocumentBankAccount): void {
    this.documentBankAccount = documentBankAccount;
    this.documentBankAccountFormService.resetForm(this.editForm, documentBankAccount);
  }
}
