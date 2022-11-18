import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithPaginationAndDTOComponent } from '../list/entity-with-pagination-and-dto.component';
import { EntityWithPaginationAndDTODetailComponent } from '../detail/entity-with-pagination-and-dto-detail.component';
import { EntityWithPaginationAndDTOUpdateComponent } from '../update/entity-with-pagination-and-dto-update.component';
import { EntityWithPaginationAndDTORoutingResolveService } from './entity-with-pagination-and-dto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithPaginationAndDTORoute: Routes = [
  {
    path: '',
    component: EntityWithPaginationAndDTOComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithPaginationAndDTODetailComponent,
    resolve: {
      entityWithPaginationAndDTO: EntityWithPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithPaginationAndDTOUpdateComponent,
    resolve: {
      entityWithPaginationAndDTO: EntityWithPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithPaginationAndDTOUpdateComponent,
    resolve: {
      entityWithPaginationAndDTO: EntityWithPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithPaginationAndDTORoute)],
  exports: [RouterModule],
})
export class EntityWithPaginationAndDTORoutingModule {}
