import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFieldTestServiceImplEntity, NewFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';

export type PartialUpdateFieldTestServiceImplEntity = Partial<IFieldTestServiceImplEntity> & Pick<IFieldTestServiceImplEntity, 'id'>;

type RestOf<T extends IFieldTestServiceImplEntity | NewFieldTestServiceImplEntity> = Omit<
  T,
  'localDateMika' | 'localDateRequiredMika' | 'instantMika' | 'instanteRequiredMika' | 'zonedDateTimeMika' | 'zonedDateTimeRequiredMika'
> & {
  localDateMika?: string | null;
  localDateRequiredMika?: string | null;
  instantMika?: string | null;
  instanteRequiredMika?: string | null;
  zonedDateTimeMika?: string | null;
  zonedDateTimeRequiredMika?: string | null;
};

export type RestFieldTestServiceImplEntity = RestOf<IFieldTestServiceImplEntity>;

export type NewRestFieldTestServiceImplEntity = RestOf<NewFieldTestServiceImplEntity>;

export type PartialUpdateRestFieldTestServiceImplEntity = RestOf<PartialUpdateFieldTestServiceImplEntity>;

export type EntityResponseType = HttpResponse<IFieldTestServiceImplEntity>;
export type EntityArrayResponseType = HttpResponse<IFieldTestServiceImplEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestServiceImplEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-test-service-impl-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldTestServiceImplEntity: NewFieldTestServiceImplEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestServiceImplEntity);
    return this.http
      .post<RestFieldTestServiceImplEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fieldTestServiceImplEntity: IFieldTestServiceImplEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestServiceImplEntity);
    return this.http
      .put<RestFieldTestServiceImplEntity>(
        `${this.resourceUrl}/${this.getFieldTestServiceImplEntityIdentifier(fieldTestServiceImplEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fieldTestServiceImplEntity: PartialUpdateFieldTestServiceImplEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestServiceImplEntity);
    return this.http
      .patch<RestFieldTestServiceImplEntity>(
        `${this.resourceUrl}/${this.getFieldTestServiceImplEntityIdentifier(fieldTestServiceImplEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFieldTestServiceImplEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFieldTestServiceImplEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldTestServiceImplEntityIdentifier(fieldTestServiceImplEntity: Pick<IFieldTestServiceImplEntity, 'id'>): string {
    return fieldTestServiceImplEntity.id;
  }

  compareFieldTestServiceImplEntity(
    o1: Pick<IFieldTestServiceImplEntity, 'id'> | null,
    o2: Pick<IFieldTestServiceImplEntity, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getFieldTestServiceImplEntityIdentifier(o1) === this.getFieldTestServiceImplEntityIdentifier(o2) : o1 === o2;
  }

  addFieldTestServiceImplEntityToCollectionIfMissing<Type extends Pick<IFieldTestServiceImplEntity, 'id'>>(
    fieldTestServiceImplEntityCollection: Type[],
    ...fieldTestServiceImplEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldTestServiceImplEntities: Type[] = fieldTestServiceImplEntitiesToCheck.filter(isPresent);
    if (fieldTestServiceImplEntities.length > 0) {
      const fieldTestServiceImplEntityCollectionIdentifiers = fieldTestServiceImplEntityCollection.map(
        fieldTestServiceImplEntityItem => this.getFieldTestServiceImplEntityIdentifier(fieldTestServiceImplEntityItem)!
      );
      const fieldTestServiceImplEntitiesToAdd = fieldTestServiceImplEntities.filter(fieldTestServiceImplEntityItem => {
        const fieldTestServiceImplEntityIdentifier = this.getFieldTestServiceImplEntityIdentifier(fieldTestServiceImplEntityItem);
        if (fieldTestServiceImplEntityCollectionIdentifiers.includes(fieldTestServiceImplEntityIdentifier)) {
          return false;
        }
        fieldTestServiceImplEntityCollectionIdentifiers.push(fieldTestServiceImplEntityIdentifier);
        return true;
      });
      return [...fieldTestServiceImplEntitiesToAdd, ...fieldTestServiceImplEntityCollection];
    }
    return fieldTestServiceImplEntityCollection;
  }

  protected convertDateFromClient<
    T extends IFieldTestServiceImplEntity | NewFieldTestServiceImplEntity | PartialUpdateFieldTestServiceImplEntity
  >(fieldTestServiceImplEntity: T): RestOf<T> {
    return {
      ...fieldTestServiceImplEntity,
      localDateMika: fieldTestServiceImplEntity.localDateMika?.format(DATE_FORMAT) ?? null,
      localDateRequiredMika: fieldTestServiceImplEntity.localDateRequiredMika?.format(DATE_FORMAT) ?? null,
      instantMika: fieldTestServiceImplEntity.instantMika?.toJSON() ?? null,
      instanteRequiredMika: fieldTestServiceImplEntity.instanteRequiredMika?.toJSON() ?? null,
      zonedDateTimeMika: fieldTestServiceImplEntity.zonedDateTimeMika?.toJSON() ?? null,
      zonedDateTimeRequiredMika: fieldTestServiceImplEntity.zonedDateTimeRequiredMika?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFieldTestServiceImplEntity: RestFieldTestServiceImplEntity): IFieldTestServiceImplEntity {
    return {
      ...restFieldTestServiceImplEntity,
      localDateMika: restFieldTestServiceImplEntity.localDateMika ? dayjs(restFieldTestServiceImplEntity.localDateMika) : undefined,
      localDateRequiredMika: restFieldTestServiceImplEntity.localDateRequiredMika
        ? dayjs(restFieldTestServiceImplEntity.localDateRequiredMika)
        : undefined,
      instantMika: restFieldTestServiceImplEntity.instantMika ? dayjs(restFieldTestServiceImplEntity.instantMika) : undefined,
      instanteRequiredMika: restFieldTestServiceImplEntity.instanteRequiredMika
        ? dayjs(restFieldTestServiceImplEntity.instanteRequiredMika)
        : undefined,
      zonedDateTimeMika: restFieldTestServiceImplEntity.zonedDateTimeMika
        ? dayjs(restFieldTestServiceImplEntity.zonedDateTimeMika)
        : undefined,
      zonedDateTimeRequiredMika: restFieldTestServiceImplEntity.zonedDateTimeRequiredMika
        ? dayjs(restFieldTestServiceImplEntity.zonedDateTimeRequiredMika)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFieldTestServiceImplEntity>): HttpResponse<IFieldTestServiceImplEntity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestFieldTestServiceImplEntity[]>
  ): HttpResponse<IFieldTestServiceImplEntity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
