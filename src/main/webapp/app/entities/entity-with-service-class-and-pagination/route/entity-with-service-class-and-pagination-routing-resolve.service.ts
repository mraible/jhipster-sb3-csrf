import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntityWithServiceClassAndPagination } from '../entity-with-service-class-and-pagination.model';
import { EntityWithServiceClassAndPaginationService } from '../service/entity-with-service-class-and-pagination.service';

@Injectable({ providedIn: 'root' })
export class EntityWithServiceClassAndPaginationRoutingResolveService implements Resolve<IEntityWithServiceClassAndPagination | null> {
  constructor(protected service: EntityWithServiceClassAndPaginationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntityWithServiceClassAndPagination | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entityWithServiceClassAndPagination: HttpResponse<IEntityWithServiceClassAndPagination>) => {
          if (entityWithServiceClassAndPagination.body) {
            return of(entityWithServiceClassAndPagination.body);
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
