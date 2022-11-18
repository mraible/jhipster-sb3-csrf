import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFieldTestInfiniteScrollEntity, NewFieldTestInfiniteScrollEntity } from '../field-test-infinite-scroll-entity.model';

export type PartialUpdateFieldTestInfiniteScrollEntity = Partial<IFieldTestInfiniteScrollEntity> &
  Pick<IFieldTestInfiniteScrollEntity, 'id'>;

type RestOf<T extends IFieldTestInfiniteScrollEntity | NewFieldTestInfiniteScrollEntity> = Omit<
  T,
  'localDateHugo' | 'localDateRequiredHugo' | 'instantHugo' | 'instanteRequiredHugo' | 'zonedDateTimeHugo' | 'zonedDateTimeRequiredHugo'
> & {
  localDateHugo?: string | null;
  localDateRequiredHugo?: string | null;
  instantHugo?: string | null;
  instanteRequiredHugo?: string | null;
  zonedDateTimeHugo?: string | null;
  zonedDateTimeRequiredHugo?: string | null;
};

export type RestFieldTestInfiniteScrollEntity = RestOf<IFieldTestInfiniteScrollEntity>;

export type NewRestFieldTestInfiniteScrollEntity = RestOf<NewFieldTestInfiniteScrollEntity>;

export type PartialUpdateRestFieldTestInfiniteScrollEntity = RestOf<PartialUpdateFieldTestInfiniteScrollEntity>;

export type EntityResponseType = HttpResponse<IFieldTestInfiniteScrollEntity>;
export type EntityArrayResponseType = HttpResponse<IFieldTestInfiniteScrollEntity[]>;

@Injectable({ providedIn: 'root' })
export class FieldTestInfiniteScrollEntityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/field-test-infinite-scroll-entities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldTestInfiniteScrollEntity: NewFieldTestInfiniteScrollEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestInfiniteScrollEntity);
    return this.http
      .post<RestFieldTestInfiniteScrollEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestInfiniteScrollEntity);
    return this.http
      .put<RestFieldTestInfiniteScrollEntity>(
        `${this.resourceUrl}/${this.getFieldTestInfiniteScrollEntityIdentifier(fieldTestInfiniteScrollEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(fieldTestInfiniteScrollEntity: PartialUpdateFieldTestInfiniteScrollEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fieldTestInfiniteScrollEntity);
    return this.http
      .patch<RestFieldTestInfiniteScrollEntity>(
        `${this.resourceUrl}/${this.getFieldTestInfiniteScrollEntityIdentifier(fieldTestInfiniteScrollEntity)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestFieldTestInfiniteScrollEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFieldTestInfiniteScrollEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldTestInfiniteScrollEntityIdentifier(fieldTestInfiniteScrollEntity: Pick<IFieldTestInfiniteScrollEntity, 'id'>): string {
    return fieldTestInfiniteScrollEntity.id;
  }

  compareFieldTestInfiniteScrollEntity(
    o1: Pick<IFieldTestInfiniteScrollEntity, 'id'> | null,
    o2: Pick<IFieldTestInfiniteScrollEntity, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getFieldTestInfiniteScrollEntityIdentifier(o1) === this.getFieldTestInfiniteScrollEntityIdentifier(o2)
      : o1 === o2;
  }

  addFieldTestInfiniteScrollEntityToCollectionIfMissing<Type extends Pick<IFieldTestInfiniteScrollEntity, 'id'>>(
    fieldTestInfiniteScrollEntityCollection: Type[],
    ...fieldTestInfiniteScrollEntitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldTestInfiniteScrollEntities: Type[] = fieldTestInfiniteScrollEntitiesToCheck.filter(isPresent);
    if (fieldTestInfiniteScrollEntities.length > 0) {
      const fieldTestInfiniteScrollEntityCollectionIdentifiers = fieldTestInfiniteScrollEntityCollection.map(
        fieldTestInfiniteScrollEntityItem => this.getFieldTestInfiniteScrollEntityIdentifier(fieldTestInfiniteScrollEntityItem)!
      );
      const fieldTestInfiniteScrollEntitiesToAdd = fieldTestInfiniteScrollEntities.filter(fieldTestInfiniteScrollEntityItem => {
        const fieldTestInfiniteScrollEntityIdentifier = this.getFieldTestInfiniteScrollEntityIdentifier(fieldTestInfiniteScrollEntityItem);
        if (fieldTestInfiniteScrollEntityCollectionIdentifiers.includes(fieldTestInfiniteScrollEntityIdentifier)) {
          return false;
        }
        fieldTestInfiniteScrollEntityCollectionIdentifiers.push(fieldTestInfiniteScrollEntityIdentifier);
        return true;
      });
      return [...fieldTestInfiniteScrollEntitiesToAdd, ...fieldTestInfiniteScrollEntityCollection];
    }
    return fieldTestInfiniteScrollEntityCollection;
  }

  protected convertDateFromClient<
    T extends IFieldTestInfiniteScrollEntity | NewFieldTestInfiniteScrollEntity | PartialUpdateFieldTestInfiniteScrollEntity
  >(fieldTestInfiniteScrollEntity: T): RestOf<T> {
    return {
      ...fieldTestInfiniteScrollEntity,
      localDateHugo: fieldTestInfiniteScrollEntity.localDateHugo?.format(DATE_FORMAT) ?? null,
      localDateRequiredHugo: fieldTestInfiniteScrollEntity.localDateRequiredHugo?.format(DATE_FORMAT) ?? null,
      instantHugo: fieldTestInfiniteScrollEntity.instantHugo?.toJSON() ?? null,
      instanteRequiredHugo: fieldTestInfiniteScrollEntity.instanteRequiredHugo?.toJSON() ?? null,
      zonedDateTimeHugo: fieldTestInfiniteScrollEntity.zonedDateTimeHugo?.toJSON() ?? null,
      zonedDateTimeRequiredHugo: fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restFieldTestInfiniteScrollEntity: RestFieldTestInfiniteScrollEntity): IFieldTestInfiniteScrollEntity {
    return {
      ...restFieldTestInfiniteScrollEntity,
      localDateHugo: restFieldTestInfiniteScrollEntity.localDateHugo ? dayjs(restFieldTestInfiniteScrollEntity.localDateHugo) : undefined,
      localDateRequiredHugo: restFieldTestInfiniteScrollEntity.localDateRequiredHugo
        ? dayjs(restFieldTestInfiniteScrollEntity.localDateRequiredHugo)
        : undefined,
      instantHugo: restFieldTestInfiniteScrollEntity.instantHugo ? dayjs(restFieldTestInfiniteScrollEntity.instantHugo) : undefined,
      instanteRequiredHugo: restFieldTestInfiniteScrollEntity.instanteRequiredHugo
        ? dayjs(restFieldTestInfiniteScrollEntity.instanteRequiredHugo)
        : undefined,
      zonedDateTimeHugo: restFieldTestInfiniteScrollEntity.zonedDateTimeHugo
        ? dayjs(restFieldTestInfiniteScrollEntity.zonedDateTimeHugo)
        : undefined,
      zonedDateTimeRequiredHugo: restFieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo
        ? dayjs(restFieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFieldTestInfiniteScrollEntity>): HttpResponse<IFieldTestInfiniteScrollEntity> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestFieldTestInfiniteScrollEntity[]>
  ): HttpResponse<IFieldTestInfiniteScrollEntity[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
