import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {
  IFieldTestServiceClassAndJpaFilteringEntity,
  NewFieldTestServiceClassAndJpaFilteringEntity,
} from '../field-test-service-class-and-jpa-filtering-entity.model';

export type PartialUpdateFieldTestServiceClassAndJpaFilteringEntity = Partial<IFieldTestServiceClassAndJpaFilteringEntity> &
  Pick<IFieldTestServiceClassAndJpaFilteringEntity, 'id'>;

type RestOf<T extends IFieldTestServiceClassAndJpaFilteringEntity | NewFieldTestServiceClassAndJpaFilteringEntity> = Omit<
  T,
  'localDateBob' | 'localDateRequiredBob' | 'instantBob' | 'instanteRequiredBob' | 'zonedDateTimeBob' | 'zonedDateTimeRequiredBob'
> & {
  localDateBob?: string | null;
  localDateRequiredBob?: string | null;
  instantBob?: string | null;
  instanteRequiredBob?: string | null;
  zonedDateTimeBob?: string | null;
  zonedDateTimeRequiredBob?: string | null;
};

export type RestFieldTestServiceClassAndJpaFilteringEntity = RestOf<IFieldTestServiceClassAndJpaFilteringEntity>;

export type NewRestFieldTestServiceClassAndJpaFilteringEntity = RestOf<NewFieldTestServiceClassAndJpaFilteringEntity>;

export type PartialUpdateRestFieldTestServiceClassAndJpaFilteringEntity = RestOf<PartialUpdateFieldTestServiceClassAndJpaFilteringEntity>;

export type EntityResponseType = HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity>;
export type EntityArrayResponseType = HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestServiceClassAndJpaFilteringEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-test-service-class-and-jpa-filtering-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldTestServiceClassAndJpaFilteringEntity: NewFieldTestServiceClassAndJpaFilteringEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestServiceClassAndJpaFilteringEntity);
    return this.http
      .post<RestFieldTestServiceClassAndJpaFilteringEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestServiceClassAndJpaFilteringEntity);
    return this.http
      .put<RestFieldTestServiceClassAndJpaFilteringEntity>(
        `${this.resourceUrl}/${this.getFieldTestServiceClassAndJpaFilteringEntityIdentifier(fieldTestServiceClassAndJpaFilteringEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(
    fieldTestServiceClassAndJpaFilteringEntity: PartialUpdateFieldTestServiceClassAndJpaFilteringEntity
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestServiceClassAndJpaFilteringEntity);
    return this.http
      .patch<RestFieldTestServiceClassAndJpaFilteringEntity>(
        `${this.resourceUrl}/${this.getFieldTestServiceClassAndJpaFilteringEntityIdentifier(fieldTestServiceClassAndJpaFilteringEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFieldTestServiceClassAndJpaFilteringEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFieldTestServiceClassAndJpaFilteringEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldTestServiceClassAndJpaFilteringEntityIdentifier(
    fieldTestServiceClassAndJpaFilteringEntity: Pick<IFieldTestServiceClassAndJpaFilteringEntity, 'id'>
  ): string {
    return fieldTestServiceClassAndJpaFilteringEntity.id;
  }

  compareFieldTestServiceClassAndJpaFilteringEntity(
    o1: Pick<IFieldTestServiceClassAndJpaFilteringEntity, 'id'> | null,
    o2: Pick<IFieldTestServiceClassAndJpaFilteringEntity, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getFieldTestServiceClassAndJpaFilteringEntityIdentifier(o1) ===
          this.getFieldTestServiceClassAndJpaFilteringEntityIdentifier(o2)
      : o1 === o2;
  }

  addFieldTestServiceClassAndJpaFilteringEntityToCollectionIfMissing<Type extends Pick<IFieldTestServiceClassAndJpaFilteringEntity, 'id'>>(
    fieldTestServiceClassAndJpaFilteringEntityCollection: Type[],
    ...fieldTestServiceClassAndJpaFilteringEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldTestServiceClassAndJpaFilteringEntities: Type[] = fieldTestServiceClassAndJpaFilteringEntitiesToCheck.filter(isPresent);
    if (fieldTestServiceClassAndJpaFilteringEntities.length > 0) {
      const fieldTestServiceClassAndJpaFilteringEntityCollectionIdentifiers = fieldTestServiceClassAndJpaFilteringEntityCollection.map(
        fieldTestServiceClassAndJpaFilteringEntityItem =>
          this.getFieldTestServiceClassAndJpaFilteringEntityIdentifier(fieldTestServiceClassAndJpaFilteringEntityItem)!
      );
      const fieldTestServiceClassAndJpaFilteringEntitiesToAdd = fieldTestServiceClassAndJpaFilteringEntities.filter(
        fieldTestServiceClassAndJpaFilteringEntityItem => {
          const fieldTestServiceClassAndJpaFilteringEntityIdentifier = this.getFieldTestServiceClassAndJpaFilteringEntityIdentifier(
            fieldTestServiceClassAndJpaFilteringEntityItem
          );
          if (
            fieldTestServiceClassAndJpaFilteringEntityCollectionIdentifiers.includes(fieldTestServiceClassAndJpaFilteringEntityIdentifier)
          ) {
            return false;
          }
          fieldTestServiceClassAndJpaFilteringEntityCollectionIdentifiers.push(fieldTestServiceClassAndJpaFilteringEntityIdentifier);
          return true;
        }
      );
      return [...fieldTestServiceClassAndJpaFilteringEntitiesToAdd, ...fieldTestServiceClassAndJpaFilteringEntityCollection];
    }
    return fieldTestServiceClassAndJpaFilteringEntityCollection;
  }

  protected convertDateFromClient<
    T extends
      | IFieldTestServiceClassAndJpaFilteringEntity
      | NewFieldTestServiceClassAndJpaFilteringEntity
      | PartialUpdateFieldTestServiceClassAndJpaFilteringEntity
  >(fieldTestServiceClassAndJpaFilteringEntity: T): RestOf<T> {
    return {
      ...fieldTestServiceClassAndJpaFilteringEntity,
      localDateBob: fieldTestServiceClassAndJpaFilteringEntity.localDateBob?.format(DATE_FORMAT) ?? null,
      localDateRequiredBob: fieldTestServiceClassAndJpaFilteringEntity.localDateRequiredBob?.format(DATE_FORMAT) ?? null,
      instantBob: fieldTestServiceClassAndJpaFilteringEntity.instantBob?.toJSON() ?? null,
      instanteRequiredBob: fieldTestServiceClassAndJpaFilteringEntity.instanteRequiredBob?.toJSON() ?? null,
      zonedDateTimeBob: fieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeBob?.toJSON() ?? null,
      zonedDateTimeRequiredBob: fieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeRequiredBob?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(
    restFieldTestServiceClassAndJpaFilteringEntity: RestFieldTestServiceClassAndJpaFilteringEntity
  ): IFieldTestServiceClassAndJpaFilteringEntity {
    return {
      ...restFieldTestServiceClassAndJpaFilteringEntity,
      localDateBob: restFieldTestServiceClassAndJpaFilteringEntity.localDateBob
        ? dayjs(restFieldTestServiceClassAndJpaFilteringEntity.localDateBob)
        : undefined,
      localDateRequiredBob: restFieldTestServiceClassAndJpaFilteringEntity.localDateRequiredBob
        ? dayjs(restFieldTestServiceClassAndJpaFilteringEntity.localDateRequiredBob)
        : undefined,
      instantBob: restFieldTestServiceClassAndJpaFilteringEntity.instantBob
        ? dayjs(restFieldTestServiceClassAndJpaFilteringEntity.instantBob)
        : undefined,
      instanteRequiredBob: restFieldTestServiceClassAndJpaFilteringEntity.instanteRequiredBob
        ? dayjs(restFieldTestServiceClassAndJpaFilteringEntity.instanteRequiredBob)
        : undefined,
      zonedDateTimeBob: restFieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeBob
        ? dayjs(restFieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeBob)
        : undefined,
      zonedDateTimeRequiredBob: restFieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeRequiredBob
        ? dayjs(restFieldTestServiceClassAndJpaFilteringEntity.zonedDateTimeRequiredBob)
        : undefined,
    };
  }

  protected convertResponseFromServer(
    res: HttpResponse<RestFieldTestServiceClassAndJpaFilteringEntity>
  ): HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestFieldTestServiceClassAndJpaFilteringEntity[]>
  ): HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
