import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFieldTestEntity, NewFieldTestEntity } from '../field-test-entity.model';

export type PartialUpdateFieldTestEntity = Partial<IFieldTestEntity> & Pick<IFieldTestEntity, 'id'>;

type RestOf<T extends IFieldTestEntity | NewFieldTestEntity> = Omit<
  T,
  'localDateTom' | 'localDateRequiredTom' | 'instantTom' | 'instantRequiredTom' | 'zonedDateTimeTom' | 'zonedDateTimeRequiredTom'
> & {
  localDateTom?: string | null;
  localDateRequiredTom?: string | null;
  instantTom?: string | null;
  instantRequiredTom?: string | null;
  zonedDateTimeTom?: string | null;
  zonedDateTimeRequiredTom?: string | null;
};

export type RestFieldTestEntity = RestOf<IFieldTestEntity>;

export type NewRestFieldTestEntity = RestOf<NewFieldTestEntity>;

export type PartialUpdateRestFieldTestEntity = RestOf<PartialUpdateFieldTestEntity>;

export type EntityResponseType = HttpResponse<IFieldTestEntity>;
export type EntityArrayResponseType = HttpResponse<IFieldTestEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-test-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldTestEntity: NewFieldTestEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestEntity);
    return this.http
      .post<RestFieldTestEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fieldTestEntity: IFieldTestEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestEntity);
    return this.http
      .put<RestFieldTestEntity>(`${this.resourceUrl}/${this.getFieldTestEntityIdentifier(fieldTestEntity)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fieldTestEntity: PartialUpdateFieldTestEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestEntity);
    return this.http
      .patch<RestFieldTestEntity>(`${this.resourceUrl}/${this.getFieldTestEntityIdentifier(fieldTestEntity)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFieldTestEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFieldTestEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldTestEntityIdentifier(fieldTestEntity: Pick<IFieldTestEntity, 'id'>): string {
    return fieldTestEntity.id;
  }

  compareFieldTestEntity(o1: Pick<IFieldTestEntity, 'id'> | null, o2: Pick<IFieldTestEntity, 'id'> | null): boolean {
    return o1 && o2 ? this.getFieldTestEntityIdentifier(o1) === this.getFieldTestEntityIdentifier(o2) : o1 === o2;
  }

  addFieldTestEntityToCollectionIfMissing<Type extends Pick<IFieldTestEntity, 'id'>>(
    fieldTestEntityCollection: Type[],
    ...fieldTestEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldTestEntities: Type[] = fieldTestEntitiesToCheck.filter(isPresent);
    if (fieldTestEntities.length > 0) {
      const fieldTestEntityCollectionIdentifiers = fieldTestEntityCollection.map(
        fieldTestEntityItem => this.getFieldTestEntityIdentifier(fieldTestEntityItem)!
      );
      const fieldTestEntitiesToAdd = fieldTestEntities.filter(fieldTestEntityItem => {
        const fieldTestEntityIdentifier = this.getFieldTestEntityIdentifier(fieldTestEntityItem);
        if (fieldTestEntityCollectionIdentifiers.includes(fieldTestEntityIdentifier)) {
          return false;
        }
        fieldTestEntityCollectionIdentifiers.push(fieldTestEntityIdentifier);
        return true;
      });
      return [...fieldTestEntitiesToAdd, ...fieldTestEntityCollection];
    }
    return fieldTestEntityCollection;
  }

  protected convertDateFromClient<T extends IFieldTestEntity | NewFieldTestEntity | PartialUpdateFieldTestEntity>(
    fieldTestEntity: T
  ): RestOf<T> {
    return {
      ...fieldTestEntity,
      localDateTom: fieldTestEntity.localDateTom?.format(DATE_FORMAT) ?? null,
      localDateRequiredTom: fieldTestEntity.localDateRequiredTom?.format(DATE_FORMAT) ?? null,
      instantTom: fieldTestEntity.instantTom?.toJSON() ?? null,
      instantRequiredTom: fieldTestEntity.instantRequiredTom?.toJSON() ?? null,
      zonedDateTimeTom: fieldTestEntity.zonedDateTimeTom?.toJSON() ?? null,
      zonedDateTimeRequiredTom: fieldTestEntity.zonedDateTimeRequiredTom?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFieldTestEntity: RestFieldTestEntity): IFieldTestEntity {
    return {
      ...restFieldTestEntity,
      localDateTom: restFieldTestEntity.localDateTom ? dayjs(restFieldTestEntity.localDateTom) : undefined,
      localDateRequiredTom: restFieldTestEntity.localDateRequiredTom ? dayjs(restFieldTestEntity.localDateRequiredTom) : undefined,
      instantTom: restFieldTestEntity.instantTom ? dayjs(restFieldTestEntity.instantTom) : undefined,
      instantRequiredTom: restFieldTestEntity.instantRequiredTom ? dayjs(restFieldTestEntity.instantRequiredTom) : undefined,
      zonedDateTimeTom: restFieldTestEntity.zonedDateTimeTom ? dayjs(restFieldTestEntity.zonedDateTimeTom) : undefined,
      zonedDateTimeRequiredTom: restFieldTestEntity.zonedDateTimeRequiredTom
        ? dayjs(restFieldTestEntity.zonedDateTimeRequiredTom)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFieldTestEntity>): HttpResponse<IFieldTestEntity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFieldTestEntity[]>): HttpResponse<IFieldTestEntity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
