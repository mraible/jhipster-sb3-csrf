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
  IFieldTestMapstructAndServiceClassEntity,
  NewFieldTestMapstructAndServiceClassEntity,
} from '../field-test-mapstruct-and-service-class-entity.model';

export type PartialUpdateFieldTestMapstructAndServiceClassEntity = Partial<IFieldTestMapstructAndServiceClassEntity> &
  Pick<IFieldTestMapstructAndServiceClassEntity, 'id'>;

type RestOf<T extends IFieldTestMapstructAndServiceClassEntity | NewFieldTestMapstructAndServiceClassEntity> = Omit<
  T,
  'localDateEva' | 'localDateRequiredEva' | 'instantEva' | 'instanteRequiredEva' | 'zonedDateTimeEva' | 'zonedDateTimeRequiredEva'
> & {
  localDateEva?: string | null;
  localDateRequiredEva?: string | null;
  instantEva?: string | null;
  instanteRequiredEva?: string | null;
  zonedDateTimeEva?: string | null;
  zonedDateTimeRequiredEva?: string | null;
};

export type RestFieldTestMapstructAndServiceClassEntity = RestOf<IFieldTestMapstructAndServiceClassEntity>;

export type NewRestFieldTestMapstructAndServiceClassEntity = RestOf<NewFieldTestMapstructAndServiceClassEntity>;

export type PartialUpdateRestFieldTestMapstructAndServiceClassEntity = RestOf<PartialUpdateFieldTestMapstructAndServiceClassEntity>;

export type EntityResponseType = HttpResponse<IFieldTestMapstructAndServiceClassEntity>;
export type EntityArrayResponseType = HttpResponse<IFieldTestMapstructAndServiceClassEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestMapstructAndServiceClassEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-test-mapstruct-and-service-class-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldTestMapstructAndServiceClassEntity: NewFieldTestMapstructAndServiceClassEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestMapstructAndServiceClassEntity);
    return this.http
      .post<RestFieldTestMapstructAndServiceClassEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestMapstructAndServiceClassEntity);
    return this.http
      .put<RestFieldTestMapstructAndServiceClassEntity>(
        `${this.resourceUrl}/${this.getFieldTestMapstructAndServiceClassEntityIdentifier(fieldTestMapstructAndServiceClassEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(
    fieldTestMapstructAndServiceClassEntity: PartialUpdateFieldTestMapstructAndServiceClassEntity
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestMapstructAndServiceClassEntity);
    return this.http
      .patch<RestFieldTestMapstructAndServiceClassEntity>(
        `${this.resourceUrl}/${this.getFieldTestMapstructAndServiceClassEntityIdentifier(fieldTestMapstructAndServiceClassEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFieldTestMapstructAndServiceClassEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFieldTestMapstructAndServiceClassEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldTestMapstructAndServiceClassEntityIdentifier(
    fieldTestMapstructAndServiceClassEntity: Pick<IFieldTestMapstructAndServiceClassEntity, 'id'>
  ): string {
    return fieldTestMapstructAndServiceClassEntity.id;
  }

  compareFieldTestMapstructAndServiceClassEntity(
    o1: Pick<IFieldTestMapstructAndServiceClassEntity, 'id'> | null,
    o2: Pick<IFieldTestMapstructAndServiceClassEntity, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getFieldTestMapstructAndServiceClassEntityIdentifier(o1) === this.getFieldTestMapstructAndServiceClassEntityIdentifier(o2)
      : o1 === o2;
  }

  addFieldTestMapstructAndServiceClassEntityToCollectionIfMissing<Type extends Pick<IFieldTestMapstructAndServiceClassEntity, 'id'>>(
    fieldTestMapstructAndServiceClassEntityCollection: Type[],
    ...fieldTestMapstructAndServiceClassEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldTestMapstructAndServiceClassEntities: Type[] = fieldTestMapstructAndServiceClassEntitiesToCheck.filter(isPresent);
    if (fieldTestMapstructAndServiceClassEntities.length > 0) {
      const fieldTestMapstructAndServiceClassEntityCollectionIdentifiers = fieldTestMapstructAndServiceClassEntityCollection.map(
        fieldTestMapstructAndServiceClassEntityItem =>
          this.getFieldTestMapstructAndServiceClassEntityIdentifier(fieldTestMapstructAndServiceClassEntityItem)!
      );
      const fieldTestMapstructAndServiceClassEntitiesToAdd = fieldTestMapstructAndServiceClassEntities.filter(
        fieldTestMapstructAndServiceClassEntityItem => {
          const fieldTestMapstructAndServiceClassEntityIdentifier = this.getFieldTestMapstructAndServiceClassEntityIdentifier(
            fieldTestMapstructAndServiceClassEntityItem
          );
          if (fieldTestMapstructAndServiceClassEntityCollectionIdentifiers.includes(fieldTestMapstructAndServiceClassEntityIdentifier)) {
            return false;
          }
          fieldTestMapstructAndServiceClassEntityCollectionIdentifiers.push(fieldTestMapstructAndServiceClassEntityIdentifier);
          return true;
        }
      );
      return [...fieldTestMapstructAndServiceClassEntitiesToAdd, ...fieldTestMapstructAndServiceClassEntityCollection];
    }
    return fieldTestMapstructAndServiceClassEntityCollection;
  }

  protected convertDateFromClient<
    T extends
      | IFieldTestMapstructAndServiceClassEntity
      | NewFieldTestMapstructAndServiceClassEntity
      | PartialUpdateFieldTestMapstructAndServiceClassEntity
  >(fieldTestMapstructAndServiceClassEntity: T): RestOf<T> {
    return {
      ...fieldTestMapstructAndServiceClassEntity,
      localDateEva: fieldTestMapstructAndServiceClassEntity.localDateEva?.format(DATE_FORMAT) ?? null,
      localDateRequiredEva: fieldTestMapstructAndServiceClassEntity.localDateRequiredEva?.format(DATE_FORMAT) ?? null,
      instantEva: fieldTestMapstructAndServiceClassEntity.instantEva?.toJSON() ?? null,
      instanteRequiredEva: fieldTestMapstructAndServiceClassEntity.instanteRequiredEva?.toJSON() ?? null,
      zonedDateTimeEva: fieldTestMapstructAndServiceClassEntity.zonedDateTimeEva?.toJSON() ?? null,
      zonedDateTimeRequiredEva: fieldTestMapstructAndServiceClassEntity.zonedDateTimeRequiredEva?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(
    restFieldTestMapstructAndServiceClassEntity: RestFieldTestMapstructAndServiceClassEntity
  ): IFieldTestMapstructAndServiceClassEntity {
    return {
      ...restFieldTestMapstructAndServiceClassEntity,
      localDateEva: restFieldTestMapstructAndServiceClassEntity.localDateEva
        ? dayjs(restFieldTestMapstructAndServiceClassEntity.localDateEva)
        : undefined,
      localDateRequiredEva: restFieldTestMapstructAndServiceClassEntity.localDateRequiredEva
        ? dayjs(restFieldTestMapstructAndServiceClassEntity.localDateRequiredEva)
        : undefined,
      instantEva: restFieldTestMapstructAndServiceClassEntity.instantEva
        ? dayjs(restFieldTestMapstructAndServiceClassEntity.instantEva)
        : undefined,
      instanteRequiredEva: restFieldTestMapstructAndServiceClassEntity.instanteRequiredEva
        ? dayjs(restFieldTestMapstructAndServiceClassEntity.instanteRequiredEva)
        : undefined,
      zonedDateTimeEva: restFieldTestMapstructAndServiceClassEntity.zonedDateTimeEva
        ? dayjs(restFieldTestMapstructAndServiceClassEntity.zonedDateTimeEva)
        : undefined,
      zonedDateTimeRequiredEva: restFieldTestMapstructAndServiceClassEntity.zonedDateTimeRequiredEva
        ? dayjs(restFieldTestMapstructAndServiceClassEntity.zonedDateTimeRequiredEva)
        : undefined,
    };
  }

  protected convertResponseFromServer(
    res: HttpResponse<RestFieldTestMapstructAndServiceClassEntity>
  ): HttpResponse<IFieldTestMapstructAndServiceClassEntity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestFieldTestMapstructAndServiceClassEntity[]>
  ): HttpResponse<IFieldTestMapstructAndServiceClassEntity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
