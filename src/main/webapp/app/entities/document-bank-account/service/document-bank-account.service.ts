import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentBankAccount, NewDocumentBankAccount } from '../document-bank-account.model';

export type PartialUpdateDocumentBankAccount = Partial<IDocumentBankAccount> & Pick<IDocumentBankAccount, 'id'>;

type RestOf<T extends IDocumentBankAccount | NewDocumentBankAccount> = Omit<T, 'openingDay' | 'lastOperationDate'> & {
  openingDay?: string | null;
  lastOperationDate?: string | null;
};

export type RestDocumentBankAccount = RestOf<IDocumentBankAccount>;

export type NewRestDocumentBankAccount = RestOf<NewDocumentBankAccount>;

export type PartialUpdateRestDocumentBankAccount = RestOf<PartialUpdateDocumentBankAccount>;

export type EntityResponseType = HttpResponse<IDocumentBankAccount>;
export type EntityArrayResponseType = HttpResponse<IDocumentBankAccount[]>;

@Injectable({ providedIn: 'root' })
export class DocumentBankAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/document-bank-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(documentBankAccount: NewDocumentBankAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentBankAccount);
    return this.http
      .post<RestDocumentBankAccount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(documentBankAccount: IDocumentBankAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentBankAccount);
    return this.http
      .put<RestDocumentBankAccount>(`${this.resourceUrl}/${this.getDocumentBankAccountIdentifier(documentBankAccount)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(documentBankAccount: PartialUpdateDocumentBankAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentBankAccount);
    return this.http
      .patch<RestDocumentBankAccount>(`${this.resourceUrl}/${this.getDocumentBankAccountIdentifier(documentBankAccount)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestDocumentBankAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDocumentBankAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDocumentBankAccountIdentifier(documentBankAccount: Pick<IDocumentBankAccount, 'id'>): string {
    return documentBankAccount.id;
  }

  compareDocumentBankAccount(o1: Pick<IDocumentBankAccount, 'id'> | null, o2: Pick<IDocumentBankAccount, 'id'> | null): boolean {
    return o1 && o2 ? this.getDocumentBankAccountIdentifier(o1) === this.getDocumentBankAccountIdentifier(o2) : o1 === o2;
  }

  addDocumentBankAccountToCollectionIfMissing<Type extends Pick<IDocumentBankAccount, 'id'>>(
    documentBankAccountCollection: Type[],
    ...documentBankAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const documentBankAccounts: Type[] = documentBankAccountsToCheck.filter(isPresent);
    if (documentBankAccounts.length > 0) {
      const documentBankAccountCollectionIdentifiers = documentBankAccountCollection.map(
        documentBankAccountItem => this.getDocumentBankAccountIdentifier(documentBankAccountItem)!
      );
      const documentBankAccountsToAdd = documentBankAccounts.filter(documentBankAccountItem => {
        const documentBankAccountIdentifier = this.getDocumentBankAccountIdentifier(documentBankAccountItem);
        if (documentBankAccountCollectionIdentifiers.includes(documentBankAccountIdentifier)) {
          return false;
        }
        documentBankAccountCollectionIdentifiers.push(documentBankAccountIdentifier);
        return true;
      });
      return [...documentBankAccountsToAdd, ...documentBankAccountCollection];
    }
    return documentBankAccountCollection;
  }

  protected convertDateFromClient<T extends IDocumentBankAccount | NewDocumentBankAccount | PartialUpdateDocumentBankAccount>(
    documentBankAccount: T
  ): RestOf<T> {
    return {
      ...documentBankAccount,
      openingDay: documentBankAccount.openingDay?.format(DATE_FORMAT) ?? null,
      lastOperationDate: documentBankAccount.lastOperationDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restDocumentBankAccount: RestDocumentBankAccount): IDocumentBankAccount {
    return {
      ...restDocumentBankAccount,
      openingDay: restDocumentBankAccount.openingDay ? dayjs(restDocumentBankAccount.openingDay) : undefined,
      lastOperationDate: restDocumentBankAccount.lastOperationDate ? dayjs(restDocumentBankAccount.lastOperationDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDocumentBankAccount>): HttpResponse<IDocumentBankAccount> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDocumentBankAccount[]>): HttpResponse<IDocumentBankAccount[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
