import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntityWithDTO } from '../entity-with-dto.model';
import { EntityWithDTOService } from '../service/entity-with-dto.service';

@Injectable({ providedIn: 'root' })
export class EntityWithDTORoutingResolveService implements Resolve<IEntityWithDTO | null> {
  constructor(protected service: EntityWithDTOService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntityWithDTO | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entityWithDTO: HttpResponse<IEntityWithDTO>) => {
          if (entityWithDTO.body) {
            return of(entityWithDTO.body);
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
