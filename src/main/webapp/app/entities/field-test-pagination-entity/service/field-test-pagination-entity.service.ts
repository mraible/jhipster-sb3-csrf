import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFieldTestPaginationEntity, NewFieldTestPaginationEntity } from '../field-test-pagination-entity.model';

export type PartialUpdateFieldTestPaginationEntity = Partial<IFieldTestPaginationEntity> & Pick<IFieldTestPaginationEntity, 'id'>;

type RestOf<T extends IFieldTestPaginationEntity | NewFieldTestPaginationEntity> = Omit<
  T,
  | 'localDateAlice'
  | 'localDateRequiredAlice'
  | 'instantAlice'
  | 'instanteRequiredAlice'
  | 'zonedDateTimeAlice'
  | 'zonedDateTimeRequiredAlice'
> & {
  localDateAlice?: string | null;
  localDateRequiredAlice?: string | null;
  instantAlice?: string | null;
  instanteRequiredAlice?: string | null;
  zonedDateTimeAlice?: string | null;
  zonedDateTimeRequiredAlice?: string | null;
};

export type RestFieldTestPaginationEntity = RestOf<IFieldTestPaginationEntity>;

export type NewRestFieldTestPaginationEntity = RestOf<NewFieldTestPaginationEntity>;

export type PartialUpdateRestFieldTestPaginationEntity = RestOf<PartialUpdateFieldTestPaginationEntity>;

export type EntityResponseType = HttpResponse<IFieldTestPaginationEntity>;
export type EntityArrayResponseType = HttpResponse<IFieldTestPaginationEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestPaginationEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-test-pagination-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldTestPaginationEntity: NewFieldTestPaginationEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestPaginationEntity);
    return this.http
      .post<RestFieldTestPaginationEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fieldTestPaginationEntity: IFieldTestPaginationEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestPaginationEntity);
    return this.http
      .put<RestFieldTestPaginationEntity>(
        `${this.resourceUrl}/${this.getFieldTestPaginationEntityIdentifier(fieldTestPaginationEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fieldTestPaginationEntity: PartialUpdateFieldTestPaginationEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestPaginationEntity);
    return this.http
      .patch<RestFieldTestPaginationEntity>(
        `${this.resourceUrl}/${this.getFieldTestPaginationEntityIdentifier(fieldTestPaginationEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFieldTestPaginationEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFieldTestPaginationEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldTestPaginationEntityIdentifier(fieldTestPaginationEntity: Pick<IFieldTestPaginationEntity, 'id'>): string {
    return fieldTestPaginationEntity.id;
  }

  compareFieldTestPaginationEntity(
    o1: Pick<IFieldTestPaginationEntity, 'id'> | null,
    o2: Pick<IFieldTestPaginationEntity, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getFieldTestPaginationEntityIdentifier(o1) === this.getFieldTestPaginationEntityIdentifier(o2) : o1 === o2;
  }

  addFieldTestPaginationEntityToCollectionIfMissing<Type extends Pick<IFieldTestPaginationEntity, 'id'>>(
    fieldTestPaginationEntityCollection: Type[],
    ...fieldTestPaginationEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldTestPaginationEntities: Type[] = fieldTestPaginationEntitiesToCheck.filter(isPresent);
    if (fieldTestPaginationEntities.length > 0) {
      const fieldTestPaginationEntityCollectionIdentifiers = fieldTestPaginationEntityCollection.map(
        fieldTestPaginationEntityItem => this.getFieldTestPaginationEntityIdentifier(fieldTestPaginationEntityItem)!
      );
      const fieldTestPaginationEntitiesToAdd = fieldTestPaginationEntities.filter(fieldTestPaginationEntityItem => {
        const fieldTestPaginationEntityIdentifier = this.getFieldTestPaginationEntityIdentifier(fieldTestPaginationEntityItem);
        if (fieldTestPaginationEntityCollectionIdentifiers.includes(fieldTestPaginationEntityIdentifier)) {
          return false;
        }
        fieldTestPaginationEntityCollectionIdentifiers.push(fieldTestPaginationEntityIdentifier);
        return true;
      });
      return [...fieldTestPaginationEntitiesToAdd, ...fieldTestPaginationEntityCollection];
    }
    return fieldTestPaginationEntityCollection;
  }

  protected convertDateFromClient<
    T extends IFieldTestPaginationEntity | NewFieldTestPaginationEntity | PartialUpdateFieldTestPaginationEntity
  >(fieldTestPaginationEntity: T): RestOf<T> {
    return {
      ...fieldTestPaginationEntity,
      localDateAlice: fieldTestPaginationEntity.localDateAlice?.format(DATE_FORMAT) ?? null,
      localDateRequiredAlice: fieldTestPaginationEntity.localDateRequiredAlice?.format(DATE_FORMAT) ?? null,
      instantAlice: fieldTestPaginationEntity.instantAlice?.toJSON() ?? null,
      instanteRequiredAlice: fieldTestPaginationEntity.instanteRequiredAlice?.toJSON() ?? null,
      zonedDateTimeAlice: fieldTestPaginationEntity.zonedDateTimeAlice?.toJSON() ?? null,
      zonedDateTimeRequiredAlice: fieldTestPaginationEntity.zonedDateTimeRequiredAlice?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFieldTestPaginationEntity: RestFieldTestPaginationEntity): IFieldTestPaginationEntity {
    return {
      ...restFieldTestPaginationEntity,
      localDateAlice: restFieldTestPaginationEntity.localDateAlice ? dayjs(restFieldTestPaginationEntity.localDateAlice) : undefined,
      localDateRequiredAlice: restFieldTestPaginationEntity.localDateRequiredAlice
        ? dayjs(restFieldTestPaginationEntity.localDateRequiredAlice)
        : undefined,
      instantAlice: restFieldTestPaginationEntity.instantAlice ? dayjs(restFieldTestPaginationEntity.instantAlice) : undefined,
      instanteRequiredAlice: restFieldTestPaginationEntity.instanteRequiredAlice
        ? dayjs(restFieldTestPaginationEntity.instanteRequiredAlice)
        : undefined,
      zonedDateTimeAlice: restFieldTestPaginationEntity.zonedDateTimeAlice
        ? dayjs(restFieldTestPaginationEntity.zonedDateTimeAlice)
        : undefined,
      zonedDateTimeRequiredAlice: restFieldTestPaginationEntity.zonedDateTimeRequiredAlice
        ? dayjs(restFieldTestPaginationEntity.zonedDateTimeRequiredAlice)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFieldTestPaginationEntity>): HttpResponse<IFieldTestPaginationEntity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFieldTestPaginationEntity[]>): HttpResponse<IFieldTestPaginationEntity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
