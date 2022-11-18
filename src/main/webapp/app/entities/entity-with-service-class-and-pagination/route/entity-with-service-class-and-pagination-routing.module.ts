import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithServiceClassAndPaginationComponent } from '../list/entity-with-service-class-and-pagination.component';
import { EntityWithServiceClassAndPaginationDetailComponent } from '../detail/entity-with-service-class-and-pagination-detail.component';
import { EntityWithServiceClassAndPaginationUpdateComponent } from '../update/entity-with-service-class-and-pagination-update.component';
import { EntityWithServiceClassAndPaginationRoutingResolveService } from './entity-with-service-class-and-pagination-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithServiceClassAndPaginationRoute: Routes = [
  {
    path: '',
    component: EntityWithServiceClassAndPaginationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithServiceClassAndPaginationDetailComponent,
    resolve: {
      entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithServiceClassAndPaginationUpdateComponent,
    resolve: {
      entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithServiceClassAndPaginationUpdateComponent,
    resolve: {
      entityWithServiceClassAndPagination: EntityWithServiceClassAndPaginationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithServiceClassAndPaginationRoute)],
  exports: [RouterModule],
})
export class EntityWithServiceClassAndPaginationRoutingModule {}
