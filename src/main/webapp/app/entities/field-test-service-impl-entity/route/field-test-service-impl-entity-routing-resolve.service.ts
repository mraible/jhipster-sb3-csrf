import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from '../service/field-test-service-impl-entity.service';

@Injectable({ providedIn: 'root' })
export class FieldTestServiceImplEntityRoutingResolveService implements Resolve<IFieldTestServiceImplEntity | null> {
  constructor(protected service: FieldTestServiceImplEntityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldTestServiceImplEntity | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fieldTestServiceImplEntity: HttpResponse<IFieldTestServiceImplEntity>) => {
          if (fieldTestServiceImplEntity.body) {
            return of(fieldTestServiceImplEntity.body);
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
