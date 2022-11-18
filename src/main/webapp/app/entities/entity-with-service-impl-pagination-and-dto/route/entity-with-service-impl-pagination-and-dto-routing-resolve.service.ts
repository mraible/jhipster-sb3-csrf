import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from '../service/entity-with-service-impl-pagination-and-dto.service';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplPaginationAndDTORoutingResolveService implements Resolve<IEntityWithServiceImplPaginationAndDTO | null> {
  constructor(protected service: EntityWithServiceImplPaginationAndDTOService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntityWithServiceImplPaginationAndDTO | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entityWithServiceImplPaginationAndDTO: HttpResponse<IEntityWithServiceImplPaginationAndDTO>) => {
          if (entityWithServiceImplPaginationAndDTO.body) {
            return of(entityWithServiceImplPaginationAndDTO.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
