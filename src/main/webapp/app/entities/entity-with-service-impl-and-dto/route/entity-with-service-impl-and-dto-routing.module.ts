import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithServiceImplAndDTOComponent } from '../list/entity-with-service-impl-and-dto.component';
import { EntityWithServiceImplAndDTODetailComponent } from '../detail/entity-with-service-impl-and-dto-detail.component';
import { EntityWithServiceImplAndDTOUpdateComponent } from '../update/entity-with-service-impl-and-dto-update.component';
import { EntityWithServiceImplAndDTORoutingResolveService } from './entity-with-service-impl-and-dto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithServiceImplAndDTORoute: Routes = [
  {
    path: '',
    component: EntityWithServiceImplAndDTOComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithServiceImplAndDTODetailComponent,
    resolve: {
      entityWithServiceImplAndDTO: EntityWithServiceImplAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithServiceImplAndDTOUpdateComponent,
    resolve: {
      entityWithServiceImplAndDTO: EntityWithServiceImplAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithServiceImplAndDTOUpdateComponent,
    resolve: {
      entityWithServiceImplAndDTO: EntityWithServiceImplAndDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithServiceImplAndDTORoute)],
  exports: [RouterModule],
})
export class EntityWithServiceImplAndDTORoutingModule {}
