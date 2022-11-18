import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntityWithServiceImplAndPagination } from '../entity-with-service-impl-and-pagination.model';
import { EntityWithServiceImplAndPaginationService } from '../service/entity-with-service-impl-and-pagination.service';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceImplAndPaginationRoutingResolveService implements Resolve<IEntityWithServiceImplAndPagination | null> {
  constructor(protected service: EntityWithServiceImplAndPaginationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntityWithServiceImplAndPagination | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entityWithServiceImplAndPagination: HttpResponse<IEntityWithServiceImplAndPagination>) => {
          if (entityWithServiceImplAndPagination.body) {
            return of(entityWithServiceImplAndPagination.body);
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
