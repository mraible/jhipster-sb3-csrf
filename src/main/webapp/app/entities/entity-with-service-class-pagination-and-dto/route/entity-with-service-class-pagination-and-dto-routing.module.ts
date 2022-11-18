import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithServiceClassPaginationAndDTOComponent } from '../list/entity-with-service-class-pagination-and-dto.component';
import { EntityWithServiceClassPaginationAndDTODetailComponent } from '../detail/entity-with-service-class-pagination-and-dto-detail.component';
import { EntityWithServiceClassPaginationAndDTOUpdateComponent } from '../update/entity-with-service-class-pagination-and-dto-update.component';
import { EntityWithServiceClassPaginationAndDTORoutingResolveService } from './entity-with-service-class-pagination-and-dto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithServiceClassPaginationAndDTORoute: Routes = [
  {
    path: '',
    component: EntityWithServiceClassPaginationAndDTOComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithServiceClassPaginationAndDTODetailComponent,
    resolve: {
      entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithServiceClassPaginationAndDTOUpdateComponent,
    resolve: {
      entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithServiceClassPaginationAndDTOUpdateComponent,
    resolve: {
      entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithServiceClassPaginationAndDTORoute)],
  exports: [RouterModule],
})
export class EntityWithServiceClassPaginationAndDTORoutingModule {}
