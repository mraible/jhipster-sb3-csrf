import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntityWithDTOComponent } from '../list/entity-with-dto.component';
import { EntityWithDTODetailComponent } from '../detail/entity-with-dto-detail.component';
import { EntityWithDTOUpdateComponent } from '../update/entity-with-dto-update.component';
import { EntityWithDTORoutingResolveService } from './entity-with-dto-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entityWithDTORoute: Routes = [
  {
    path: '',
    component: EntityWithDTOComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntityWithDTODetailComponent,
    resolve: {
      entityWithDTO: EntityWithDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntityWithDTOUpdateComponent,
    resolve: {
      entityWithDTO: EntityWithDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntityWithDTOUpdateComponent,
    resolve: {
      entityWithDTO: EntityWithDTORoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entityWithDTORoute)],
  exports: [RouterModule],
})
export class EntityWithDTORoutingModule {}
