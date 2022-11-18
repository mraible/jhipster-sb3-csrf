import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlace, NewPlace } from '../place.model';

export type PartialUpdatePlace = Partial<IPlace> & Pick<IPlace, 'id'>;

export type EntityResponseType = HttpResponse<IPlace>;
export type EntityArrayResponseType = HttpResponse<IPlace[]>;

@Injectable({ providedIn: 'root' })
export class PlaceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/places');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(place: NewPlace): Observable<EntityResponseType> {
    return this.http.post<IPlace>(this.resourceUrl, place, { observe: 'response' });
  }

  update(place: IPlace): Observable<EntityResponseType> {
    return this.http.put<IPlace>(`${this.resourceUrl}/${this.getPlaceIdentifier(place)}`, place, { observe: 'response' });
  }

  partialUpdate(place: PartialUpdatePlace): Observable<EntityResponseType> {
    return this.http.patch<IPlace>(`${this.resourceUrl}/${this.getPlaceIdentifier(place)}`, place, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPlace>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlace[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlaceIdentifier(place: Pick<IPlace, 'id'>): string {
    return place.id;
  }

  comparePlace(o1: Pick<IPlace, 'id'> | null, o2: Pick<IPlace, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlaceIdentifier(o1) === this.getPlaceIdentifier(o2) : o1 === o2;
  }

  addPlaceToCollectionIfMissing<Type extends Pick<IPlace, 'id'>>(
    placeCollection: Type[],
    ...placesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const places: Type[] = placesToCheck.filter(isPresent);
    if (places.length > 0) {
      const placeCollectionIdentifiers = placeCollection.map(placeItem => this.getPlaceIdentifier(placeItem)!);
      const placesToAdd = places.filter(placeItem => {
        const placeIdentifier = this.getPlaceIdentifier(placeItem);
        if (placeCollectionIdentifiers.includes(placeIdentifier)) {
          return false;
        }
        placeCollectionIdentifiers.push(placeIdentifier);
        return true;
      });
      return [...placesToAdd, ...placeCollection];
    }
    return placeCollection;
  }
}
