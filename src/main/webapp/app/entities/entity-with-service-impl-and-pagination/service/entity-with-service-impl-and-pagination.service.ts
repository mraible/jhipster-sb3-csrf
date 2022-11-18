import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {
  IEntityWithServiceImplAndPagination,
  NewEntityWithServiceImplAndPagination,
} from '../entity-with-service-impl-and-pagination.model';

export type PartialUpdateEntityWithServiceImplAndPagination = Partial<IEntityWithServiceImplAndPagination> &
  Pick<IEntityWithServiceImplAndPagination, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithServiceImplAndPagination>;
export type EntityArrayResponseType = HttpResponse<IEntityWithServiceImplAndPagination[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndPaginationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-service-impl-and-paginations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithServiceImplAndPagination: NewEntityWithServiceImplAndPagination): Observable<EntityResponseType> {
    return this.http.post<IEntityWithServiceImplAndPagination>(this.resourceUrl, entityWithServiceImplAndPagination, {
      observe: 'response',
    });
  }

  update(entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination): Observable<EntityResponseType> {
    return this.http.put<IEntityWithServiceImplAndPagination>(
      `${this.resourceUrl}/${this.getEntityWithServiceImplAndPaginationIdentifier(entityWithServiceImplAndPagination)}`,
      entityWithServiceImplAndPagination,
      { observe: 'response' }
    );
  }

  partialUpdate(entityWithServiceImplAndPagination: PartialUpdateEntityWithServiceImplAndPagination): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithServiceImplAndPagination>(
      `${this.resourceUrl}/${this.getEntityWithServiceImplAndPaginationIdentifier(entityWithServiceImplAndPagination)}`,
      entityWithServiceImplAndPagination,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithServiceImplAndPagination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithServiceImplAndPagination[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithServiceImplAndPaginationIdentifier(
    entityWithServiceImplAndPagination: Pick<IEntityWithServiceImplAndPagination, 'id'>
  ): string {
    return entityWithServiceImplAndPagination.id;
  }

  compareEntityWithServiceImplAndPagination(
    o1: Pick<IEntityWithServiceImplAndPagination, 'id'> | null,
    o2: Pick<IEntityWithServiceImplAndPagination, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getEntityWithServiceImplAndPaginationIdentifier(o1) === this.getEntityWithServiceImplAndPaginationIdentifier(o2)
      : o1 === o2;
  }

  addEntityWithServiceImplAndPaginationToCollectionIfMissing<Type extends Pick<IEntityWithServiceImplAndPagination, 'id'>>(
    entityWithServiceImplAndPaginationCollection: Type[],
    ...entityWithServiceImplAndPaginationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithServiceImplAndPaginations: Type[] = entityWithServiceImplAndPaginationsToCheck.filter(isPresent);
    if (entityWithServiceImplAndPaginations.length > 0) {
      const entityWithServiceImplAndPaginationCollectionIdentifiers = entityWithServiceImplAndPaginationCollection.map(
        entityWithServiceImplAndPaginationItem =>
          this.getEntityWithServiceImplAndPaginationIdentifier(entityWithServiceImplAndPaginationItem)!
      );
      const entityWithServiceImplAndPaginationsToAdd = entityWithServiceImplAndPaginations.filter(
        entityWithServiceImplAndPaginationItem => {
          const entityWithServiceImplAndPaginationIdentifier = this.getEntityWithServiceImplAndPaginationIdentifier(
            entityWithServiceImplAndPaginationItem
          );
          if (entityWithServiceImplAndPaginationCollectionIdentifiers.includes(entityWithServiceImplAndPaginationIdentifier)) {
            return false;
          }
          entityWithServiceImplAndPaginationCollectionIdentifiers.push(entityWithServiceImplAndPaginationIdentifier);
          return true;
        }
      );
      return [...entityWithServiceImplAndPaginationsToAdd, ...entityWithServiceImplAndPaginationCollection];
    }
    return entityWithServiceImplAndPaginationCollection;
  }
}
