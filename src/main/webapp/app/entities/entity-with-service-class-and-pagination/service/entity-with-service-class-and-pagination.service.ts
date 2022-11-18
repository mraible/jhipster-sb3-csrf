import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {
  IEntityWithServiceClassAndPagination,
  NewEntityWithServiceClassAndPagination,
} from '../entity-with-service-class-and-pagination.model';

export type PartialUpdateEntityWithServiceClassAndPagination = Partial<IEntityWithServiceClassAndPagination> &
  Pick<IEntityWithServiceClassAndPagination, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithServiceClassAndPagination>;
export type EntityArrayResponseType = HttpResponse<IEntityWithServiceClassAndPagination[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndPaginationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-service-class-and-paginations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithServiceClassAndPagination: NewEntityWithServiceClassAndPagination): Observable<EntityResponseType> {
    return this.http.post<IEntityWithServiceClassAndPagination>(this.resourceUrl, entityWithServiceClassAndPagination, {
      observe: 'response',
    });
  }

  update(entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination): Observable<EntityResponseType> {
    return this.http.put<IEntityWithServiceClassAndPagination>(
      `${this.resourceUrl}/${this.getEntityWithServiceClassAndPaginationIdentifier(entityWithServiceClassAndPagination)}`,
      entityWithServiceClassAndPagination,
      { observe: 'response' }
    );
  }

  partialUpdate(entityWithServiceClassAndPagination: PartialUpdateEntityWithServiceClassAndPagination): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithServiceClassAndPagination>(
      `${this.resourceUrl}/${this.getEntityWithServiceClassAndPaginationIdentifier(entityWithServiceClassAndPagination)}`,
      entityWithServiceClassAndPagination,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithServiceClassAndPagination>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithServiceClassAndPagination[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithServiceClassAndPaginationIdentifier(
    entityWithServiceClassAndPagination: Pick<IEntityWithServiceClassAndPagination, 'id'>
  ): string {
    return entityWithServiceClassAndPagination.id;
  }

  compareEntityWithServiceClassAndPagination(
    o1: Pick<IEntityWithServiceClassAndPagination, 'id'> | null,
    o2: Pick<IEntityWithServiceClassAndPagination, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getEntityWithServiceClassAndPaginationIdentifier(o1) === this.getEntityWithServiceClassAndPaginationIdentifier(o2)
      : o1 === o2;
  }

  addEntityWithServiceClassAndPaginationToCollectionIfMissing<Type extends Pick<IEntityWithServiceClassAndPagination, 'id'>>(
    entityWithServiceClassAndPaginationCollection: Type[],
    ...entityWithServiceClassAndPaginationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithServiceClassAndPaginations: Type[] = entityWithServiceClassAndPaginationsToCheck.filter(isPresent);
    if (entityWithServiceClassAndPaginations.length > 0) {
      const entityWithServiceClassAndPaginationCollectionIdentifiers = entityWithServiceClassAndPaginationCollection.map(
        entityWithServiceClassAndPaginationItem =>
          this.getEntityWithServiceClassAndPaginationIdentifier(entityWithServiceClassAndPaginationItem)!
      );
      const entityWithServiceClassAndPaginationsToAdd = entityWithServiceClassAndPaginations.filter(
        entityWithServiceClassAndPaginationItem => {
          const entityWithServiceClassAndPaginationIdentifier = this.getEntityWithServiceClassAndPaginationIdentifier(
            entityWithServiceClassAndPaginationItem
          );
          if (entityWithServiceClassAndPaginationCollectionIdentifiers.includes(entityWithServiceClassAndPaginationIdentifier)) {
            return false;
          }
          entityWithServiceClassAndPaginationCollectionIdentifiers.push(entityWithServiceClassAndPaginationIdentifier);
          return true;
        }
      );
      return [...entityWithServiceClassAndPaginationsToAdd, ...entityWithServiceClassAndPaginationCollection];
    }
    return entityWithServiceClassAndPaginationCollection;
  }
}
