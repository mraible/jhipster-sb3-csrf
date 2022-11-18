import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntityWithDTO, NewEntityWithDTO } from '../entity-with-dto.model';

export type PartialUpdateEntityWithDTO = Partial<IEntityWithDTO> & Pick<IEntityWithDTO, 'id'>;

export type EntityResponseType = HttpResponse<IEntityWithDTO>;
export type EntityArrayResponseType = HttpResponse<IEntityWithDTO[]>;

@Injectable({ providedIn: 'root' })
export class EntityWithDTOService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entity-with-dtos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entityWithDTO: NewEntityWithDTO): Observable<EntityResponseType> {
    return this.http.post<IEntityWithDTO>(this.resourceUrl, entityWithDTO, { observe: 'response' });
  }

  update(entityWithDTO: IEntityWithDTO): Observable<EntityResponseType> {
    return this.http.put<IEntityWithDTO>(`${this.resourceUrl}/${this.getEntityWithDTOIdentifier(entityWithDTO)}`, entityWithDTO, {
      observe: 'response',
    });
  }

  partialUpdate(entityWithDTO: PartialUpdateEntityWithDTO): Observable<EntityResponseType> {
    return this.http.patch<IEntityWithDTO>(`${this.resourceUrl}/${this.getEntityWithDTOIdentifier(entityWithDTO)}`, entityWithDTO, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEntityWithDTO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntityWithDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntityWithDTOIdentifier(entityWithDTO: Pick<IEntityWithDTO, 'id'>): string {
    return entityWithDTO.id;
  }

  compareEntityWithDTO(o1: Pick<IEntityWithDTO, 'id'> | null, o2: Pick<IEntityWithDTO, 'id'> | null): boolean {
    return o1 && o2 ? this.getEntityWithDTOIdentifier(o1) === this.getEntityWithDTOIdentifier(o2) : o1 === o2;
  }

  addEntityWithDTOToCollectionIfMissing<Type extends Pick<IEntityWithDTO, 'id'>>(
    entityWithDTOCollection: Type[],
    ...entityWithDTOSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entityWithDTOS: Type[] = entityWithDTOSToCheck.filter(isPresent);
    if (entityWithDTOS.length > 0) {
      const entityWithDTOCollectionIdentifiers = entityWithDTOCollection.map(
        entityWithDTOItem => this.getEntityWithDTOIdentifier(entityWithDTOItem)!
      );
      const entityWithDTOSToAdd = entityWithDTOS.filter(entityWithDTOItem => {
        const entityWithDTOIdentifier = this.getEntityWithDTOIdentifier(entityWithDTOItem);
        if (entityWithDTOCollectionIdentifiers.includes(entityWithDTOIdentifier)) {
          return false;
        }
        entityWithDTOCollectionIdentifiers.push(entityWithDTOIdentifier);
        return true;
      });
      return [...entityWithDTOSToAdd, ...entityWithDTOCollection];
    }
    return entityWithDTOCollection;
  }
}
