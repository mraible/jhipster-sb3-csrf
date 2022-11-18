import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithServiceImplPaginationAndDTOComponent } from '../list/entity-with-service-impl-pagination-and-dto.component';
import { EntityWithServiceImplPaginationAndDTODetailComponent } from '../detail/entity-with-service-impl-pagination-and-dto-detail.component';
import { EntityWithServiceImplPaginationAndDTOUpdateComponent } from '../update/entity-with-service-impl-pagination-and-dto-update.component';
import { EntityWithServiceImplPaginationAndDTORoutingResolveService } from './entity-with-service-impl-pagination-and-dto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithServiceImplPaginationAndDTORoute: Routes = [
  {
    path: '',
    component: EntityWithServiceImplPaginationAndDTOComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithServiceImplPaginationAndDTODetailComponent,
    resolve: {
      entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithServiceImplPaginationAndDTOUpdateComponent,
    resolve: {
      entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithServiceImplPaginationAndDTOUpdateComponent,
    resolve: {
      entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithServiceImplPaginationAndDTORoute)],
  exports: [RouterModule],
})
export class EntityWithServiceImplPaginationAndDTORoutingModule {}
