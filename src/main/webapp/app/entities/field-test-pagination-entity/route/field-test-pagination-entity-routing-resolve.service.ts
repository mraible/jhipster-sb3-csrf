import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFieldTestPaginationEntity } from '../field-test-pagination-entity.model';
import { FieldTestPaginationEntityService } from '../service/field-test-pagination-entity.service';

@Injectable({ providedIn: 'root' })
export class FieldTestPaginationEntityRoutingResolveService implements Resolve<IFieldTestPaginationEntity | null> {
  constructor(protected service: FieldTestPaginationEntityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldTestPaginationEntity | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fieldTestPaginationEntity: HttpResponse<IFieldTestPaginationEntity>) => {
          if (fieldTestPaginationEntity.body) {
            return of(fieldTestPaginationEntity.body);
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
