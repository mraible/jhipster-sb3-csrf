import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntityWithServiceImplAndDTO, NewEntityWithServiceImplAndDTO } from '../entity-with-service-impl-and-dto.model';

export type PartialUpdateEntityWithServiceImplAndDTO = Partial<IEntityWithServiceImplAndDTO> & Pick<IEntityWithServiceImplAndDTO, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithServiceImplAndDTO>;
export type EntityArrayResponseType = HttpResponse<IEntityWithServiceImplAndDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndDTOService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-service-impl-and-dtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithServiceImplAndDTO: NewEntityWithServiceImplAndDTO): Observable<EntityResponseType> {
    return this.http.post<IEntityWithServiceImplAndDTO>(this.resourceUrl, entityWithServiceImplAndDTO, { observe: 'response' });
  }

  update(entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO): Observable<EntityResponseType> {
    return this.http.put<IEntityWithServiceImplAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithServiceImplAndDTOIdentifier(entityWithServiceImplAndDTO)}`,
      entityWithServiceImplAndDTO,
      { observe: 'response' }
    );
  }

  partialUpdate(entityWithServiceImplAndDTO: PartialUpdateEntityWithServiceImplAndDTO): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithServiceImplAndDTO>(
      `${this.resourceUrl}/${this.getEntityWithServiceImplAndDTOIdentifier(entityWithServiceImplAndDTO)}`,
      entityWithServiceImplAndDTO,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithServiceImplAndDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithServiceImplAndDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithServiceImplAndDTOIdentifier(entityWithServiceImplAndDTO: Pick<IEntityWithServiceImplAndDTO, 'id'>): string {
    return entityWithServiceImplAndDTO.id;
  }

  compareEntityWithServiceImplAndDTO(
    o1: Pick<IEntityWithServiceImplAndDTO, 'id'> | null,
    o2: Pick<IEntityWithServiceImplAndDTO, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getEntityWithServiceImplAndDTOIdentifier(o1) === this.getEntityWithServiceImplAndDTOIdentifier(o2) : o1 === o2;
  }

  addEntityWithServiceImplAndDTOToCollectionIfMissing<Type extends Pick<IEntityWithServiceImplAndDTO, 'id'>>(
    entityWithServiceImplAndDTOCollection: Type[],
    ...entityWithServiceImplAndDTOSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithServiceImplAndDTOS: Type[] = entityWithServiceImplAndDTOSToCheck.filter(isPresent);
    if (entityWithServiceImplAndDTOS.length > 0) {
      const entityWithServiceImplAndDTOCollectionIdentifiers = entityWithServiceImplAndDTOCollection.map(
        entityWithServiceImplAndDTOItem => this.getEntityWithServiceImplAndDTOIdentifier(entityWithServiceImplAndDTOItem)!
      );
      const entityWithServiceImplAndDTOSToAdd = entityWithServiceImplAndDTOS.filter(entityWithServiceImplAndDTOItem => {
        const entityWithServiceImplAndDTOIdentifier = this.getEntityWithServiceImplAndDTOIdentifier(entityWithServiceImplAndDTOItem);
        if (entityWithServiceImplAndDTOCollectionIdentifiers.includes(entityWithServiceImplAndDTOIdentifier)) {
          return false;
        }
        entityWithServiceImplAndDTOCollectionIdentifiers.push(entityWithServiceImplAndDTOIdentifier);
        return true;
      });
      return [...entityWithServiceImplAndDTOSToAdd, ...entityWithServiceImplAndDTOCollection];
    }
    return entityWithServiceImplAndDTOCollection;
  }
}
