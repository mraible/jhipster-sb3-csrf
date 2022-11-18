import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {
  IEntityWithServiceClassPaginationAndDTO,
  NewEntityWithServiceClassPaginationAndDTO,
} from '../entity-with-service-class-pagination-and-dto.model';

export type PartialUpdateEntityWithServiceClassPaginationAndDTO = Partial<IEntityWithServiceClassPaginationAndDTO> &
  Pick<IEntityWithServiceClassPaginationAndDTO, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithServiceClassPaginationAndDTO>;
export type EntityArrayResponseType = HttpResponse<IEntityWithServiceClassPaginationAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassPaginationAndDTOService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-service-class-pagination-and-dtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithServiceClassPaginationAndDTO: NewEntityWithServiceClassPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.post<IEntityWithServiceClassPaginationAndDTO>(this.resourceUrl, entityWithServiceClassPaginationAndDTO, {
      observe: 'response',
    });
  }

  update(entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.put<IEntityWithServiceClassPaginationAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithServiceClassPaginationAndDTOIdentifier(entityWithServiceClassPaginationAndDTO)}`,
      entityWithServiceClassPaginationAndDTO,
      { observe: 'response' }
    );
  }

  partialUpdate(
    entityWithServiceClassPaginationAndDTO: PartialUpdateEntityWithServiceClassPaginationAndDTO
  ): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithServiceClassPaginationAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithServiceClassPaginationAndDTOIdentifier(entityWithServiceClassPaginationAndDTO)}`,
      entityWithServiceClassPaginationAndDTO,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithServiceClassPaginationAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithServiceClassPaginationAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithServiceClassPaginationAndDTOIdentifier(
    entityWithServiceClassPaginationAndDTO: Pick<IEntityWithServiceClassPaginationAndDTO, 'id'>
  ): string {
    return entityWithServiceClassPaginationAndDTO.id;
  }

  compareEntityWithServiceClassPaginationAndDTO(
    o1: Pick<IEntityWithServiceClassPaginationAndDTO, 'id'> | null,
    o2: Pick<IEntityWithServiceClassPaginationAndDTO, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getEntityWithServiceClassPaginationAndDTOIdentifier(o1) === this.getEntityWithServiceClassPaginationAndDTOIdentifier(o2)
      : o1 === o2;
  }

  addEntityWithServiceClassPaginationAndDTOToCollectionIfMissing<Type extends Pick<IEntityWithServiceClassPaginationAndDTO, 'id'>>(
    entityWithServiceClassPaginationAndDTOCollection: Type[],
    ...entityWithServiceClassPaginationAndDTOSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithServiceClassPaginationAndDTOS: Type[] = entityWithServiceClassPaginationAndDTOSToCheck.filter(isPresent);
    if (entityWithServiceClassPaginationAndDTOS.length > 0) {
      const entityWithServiceClassPaginationAndDTOCollectionIdentifiers = entityWithServiceClassPaginationAndDTOCollection.map(
        entityWithServiceClassPaginationAndDTOItem =>
          this.getEntityWithServiceClassPaginationAndDTOIdentifier(entityWithServiceClassPaginationAndDTOItem)!
      );
      const entityWithServiceClassPaginationAndDTOSToAdd = entityWithServiceClassPaginationAndDTOS.filter(
        entityWithServiceClassPaginationAndDTOItem => {
          const entityWithServiceClassPaginationAndDTOIdentifier = this.getEntityWithServiceClassPaginationAndDTOIdentifier(
            entityWithServiceClassPaginationAndDTOItem
          );
          if (entityWithServiceClassPaginationAndDTOCollectionIdentifiers.includes(entityWithServiceClassPaginationAndDTOIdentifier)) {
            return false;
          }
          entityWithServiceClassPaginationAndDTOCollectionIdentifiers.push(entityWithServiceClassPaginationAndDTOIdentifier);
          return true;
        }
      );
      return [...entityWithServiceClassPaginationAndDTOSToAdd, ...entityWithServiceClassPaginationAndDTOCollection];
    }
    return entityWithServiceClassPaginationAndDTOCollection;
  }
}
