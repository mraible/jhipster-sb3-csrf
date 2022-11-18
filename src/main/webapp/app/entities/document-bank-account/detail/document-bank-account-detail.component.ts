import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentBankAccount } from '../document-bank-account.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-document-bank-account-detail',
  templateUrl: './document-bank-account-detail.component.html',
})
export class DocumentBankAccountDetailComponent implements OnInit {
  documentBankAccount: IDocumentBankAccount | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentBankAccount }) => {
      this.documentBankAccount = documentBankAccount;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
