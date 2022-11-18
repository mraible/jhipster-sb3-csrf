import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import {
  IEntityWithServiceImplPaginationAndDTO,
  NewEntityWithServiceImplPaginationAndDTO,
} from '../entity-with-service-impl-pagination-and-dto.model';

export type PartialUpdateEntityWithServiceImplPaginationAndDTO = Partial<IEntityWithServiceImplPaginationAndDTO> &
  Pick<IEntityWithServiceImplPaginationAndDTO, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithServiceImplPaginationAndDTO>;
export type EntityArrayResponseType = HttpResponse<IEntityWithServiceImplPaginationAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplPaginationAndDTOService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-service-impl-pagination-and-dtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithServiceImplPaginationAndDTO: NewEntityWithServiceImplPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.post<IEntityWithServiceImplPaginationAndDTO>(this.resourceUrl, entityWithServiceImplPaginationAndDTO, {
      observe: 'response',
    });
  }

  update(entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.put<IEntityWithServiceImplPaginationAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithServiceImplPaginationAndDTOIdentifier(entityWithServiceImplPaginationAndDTO)}`,
      entityWithServiceImplPaginationAndDTO,
      { observe: 'response' }
    );
  }

  partialUpdate(entityWithServiceImplPaginationAndDTO: PartialUpdateEntityWithServiceImplPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithServiceImplPaginationAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithServiceImplPaginationAndDTOIdentifier(entityWithServiceImplPaginationAndDTO)}`,
      entityWithServiceImplPaginationAndDTO,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithServiceImplPaginationAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithServiceImplPaginationAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithServiceImplPaginationAndDTOIdentifier(
    entityWithServiceImplPaginationAndDTO: Pick<IEntityWithServiceImplPaginationAndDTO, 'id'>
  ): string {
    return entityWithServiceImplPaginationAndDTO.id;
  }

  compareEntityWithServiceImplPaginationAndDTO(
    o1: Pick<IEntityWithServiceImplPaginationAndDTO, 'id'> | null,
    o2: Pick<IEntityWithServiceImplPaginationAndDTO, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getEntityWithServiceImplPaginationAndDTOIdentifier(o1) === this.getEntityWithServiceImplPaginationAndDTOIdentifier(o2)
      : o1 === o2;
  }

  addEntityWithServiceImplPaginationAndDTOToCollectionIfMissing<Type extends Pick<IEntityWithServiceImplPaginationAndDTO, 'id'>>(
    entityWithServiceImplPaginationAndDTOCollection: Type[],
    ...entityWithServiceImplPaginationAndDTOSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithServiceImplPaginationAndDTOS: Type[] = entityWithServiceImplPaginationAndDTOSToCheck.filter(isPresent);
    if (entityWithServiceImplPaginationAndDTOS.length > 0) {
      const entityWithServiceImplPaginationAndDTOCollectionIdentifiers = entityWithServiceImplPaginationAndDTOCollection.map(
        entityWithServiceImplPaginationAndDTOItem =>
          this.getEntityWithServiceImplPaginationAndDTOIdentifier(entityWithServiceImplPaginationAndDTOItem)!
      );
      const entityWithServiceImplPaginationAndDTOSToAdd = entityWithServiceImplPaginationAndDTOS.filter(
        entityWithServiceImplPaginationAndDTOItem => {
          const entityWithServiceImplPaginationAndDTOIdentifier = this.getEntityWithServiceImplPaginationAndDTOIdentifier(
            entityWithServiceImplPaginationAndDTOItem
          );
          if (entityWithServiceImplPaginationAndDTOCollectionIdentifiers.includes(entityWithServiceImplPaginationAndDTOIdentifier)) {
            return false;
          }
          entityWithServiceImplPaginationAndDTOCollectionIdentifiers.push(entityWithServiceImplPaginationAndDTOIdentifier);
          return true;
        }
      );
      return [...entityWithServiceImplPaginationAndDTOSToAdd, ...entityWithServiceImplPaginationAndDTOCollection];
    }
    return entityWithServiceImplPaginationAndDTOCollection;
  }
}
