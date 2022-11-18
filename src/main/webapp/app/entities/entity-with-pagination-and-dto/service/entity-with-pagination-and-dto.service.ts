import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntityWithPaginationAndDTO, NewEntityWithPaginationAndDTO } from '../entity-with-pagination-and-dto.model';

export type PartialUpdateEntityWithPaginationAndDTO = Partial<IEntityWithPaginationAndDTO> & Pick<IEntityWithPaginationAndDTO, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithPaginationAndDTO>;
export type EntityArrayResponseType = HttpResponse<IEntityWithPaginationAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithPaginationAndDTOService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-pagination-and-dtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithPaginationAndDTO: NewEntityWithPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.post<IEntityWithPaginationAndDTO>(this.resourceUrl, entityWithPaginationAndDTO, { observe: 'response' });
  }

  update(entityWithPaginationAndDTO: IEntityWithPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.put<IEntityWithPaginationAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithPaginationAndDTOIdentifier(entityWithPaginationAndDTO)}`,
      entityWithPaginationAndDTO,
      { observe: 'response' }
    );
  }

  partialUpdate(entityWithPaginationAndDTO: PartialUpdateEntityWithPaginationAndDTO): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithPaginationAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithPaginationAndDTOIdentifier(entityWithPaginationAndDTO)}`,
      entityWithPaginationAndDTO,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithPaginationAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithPaginationAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithPaginationAndDTOIdentifier(entityWithPaginationAndDTO: Pick<IEntityWithPaginationAndDTO, 'id'>): string {
    return entityWithPaginationAndDTO.id;
  }

  compareEntityWithPaginationAndDTO(
    o1: Pick<IEntityWithPaginationAndDTO, 'id'> | null,
    o2: Pick<IEntityWithPaginationAndDTO, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getEntityWithPaginationAndDTOIdentifier(o1) === this.getEntityWithPaginationAndDTOIdentifier(o2) : o1 === o2;
  }

  addEntityWithPaginationAndDTOToCollectionIfMissing<Type extends Pick<IEntityWithPaginationAndDTO, 'id'>>(
    entityWithPaginationAndDTOCollection: Type[],
    ...entityWithPaginationAndDTOSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithPaginationAndDTOS: Type[] = entityWithPaginationAndDTOSToCheck.filter(isPresent);
    if (entityWithPaginationAndDTOS.length > 0) {
      const entityWithPaginationAndDTOCollectionIdentifiers = entityWithPaginationAndDTOCollection.map(
        entityWithPaginationAndDTOItem => this.getEntityWithPaginationAndDTOIdentifier(entityWithPaginationAndDTOItem)!
      );
      const entityWithPaginationAndDTOSToAdd = entityWithPaginationAndDTOS.filter(entityWithPaginationAndDTOItem => {
        const entityWithPaginationAndDTOIdentifier = this.getEntityWithPaginationAndDTOIdentifier(entityWithPaginationAndDTOItem);
        if (entityWithPaginationAndDTOCollectionIdentifiers.includes(entityWithPaginationAndDTOIdentifier)) {
          return false;
        }
        entityWithPaginationAndDTOCollectionIdentifiers.push(entityWithPaginationAndDTOIdentifier);
        return true;
      });
      return [...entityWithPaginationAndDTOSToAdd, ...entityWithPaginationAndDTOCollection];
    }
    return entityWithPaginationAndDTOCollection;
  }
}
