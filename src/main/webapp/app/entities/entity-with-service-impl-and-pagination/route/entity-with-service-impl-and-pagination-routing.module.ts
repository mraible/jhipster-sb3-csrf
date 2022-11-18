import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithServiceImplAndPaginationComponent } from '../list/entity-with-service-impl-and-pagination.component';
import { EntityWithServiceImplAndPaginationDetailComponent } from '../detail/entity-with-service-impl-and-pagination-detail.component';
import { EntityWithServiceImplAndPaginationUpdateComponent } from '../update/entity-with-service-impl-and-pagination-update.component';
import { EntityWithServiceImplAndPaginationRoutingResolveService } from './entity-with-service-impl-and-pagination-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithServiceImplAndPaginationRoute: Routes = [
  {
    path: '',
    component: EntityWithServiceImplAndPaginationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithServiceImplAndPaginationDetailComponent,
    resolve: {
      entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithServiceImplAndPaginationUpdateComponent,
    resolve: {
      entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithServiceImplAndPaginationUpdateComponent,
    resolve: {
      entityWithServiceImplAndPagination: EntityWithServiceImplAndPaginationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithServiceImplAndPaginationRoute)],
  exports: [RouterModule],
})
export class EntityWithServiceImplAndPaginationRoutingModule {}
