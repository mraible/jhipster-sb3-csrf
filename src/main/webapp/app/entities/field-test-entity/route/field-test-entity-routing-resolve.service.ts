import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFieldTestEntity } from '../field-test-entity.model';
import { FieldTestEntityService } from '../service/field-test-entity.service';

@Injectable({ providedIn: 'root' })
export class FieldTestEntityRoutingResolveService implements Resolve<IFieldTestEntity | null> {
  constructor(protected service: FieldTestEntityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFieldTestEntity | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fieldTestEntity: HttpResponse<IFieldTestEntity>) => {
          if (fieldTestEntity.body) {
            return of(fieldTestEntity.body);
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
