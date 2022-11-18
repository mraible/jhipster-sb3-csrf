import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldTestMapstructAndServiceClassEntityComponent } from '../list/field-test-mapstruct-and-service-class-entity.component';
import { FieldTestMapstructAndServiceClassEntityDetailComponent } from '../detail/field-test-mapstruct-and-service-class-entity-detail.component';
import { FieldTestMapstructAndServiceClassEntityUpdateComponent } from '../update/field-test-mapstruct-and-service-class-entity-update.component';
import { FieldTestMapstructAndServiceClassEntityRoutingResolveService } from './field-test-mapstruct-and-service-class-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldTestMapstructAndServiceClassEntityRoute: Routes = [
  {
    path: '',
    component: FieldTestMapstructAndServiceClassEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldTestMapstructAndServiceClassEntityDetailComponent,
    resolve: {
      fieldTestMapstructAndServiceClassEntity: FieldTestMapstructAndServiceClassEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldTestMapstructAndServiceClassEntityUpdateComponent,
    resolve: {
      fieldTestMapstructAndServiceClassEntity: FieldTestMapstructAndServiceClassEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldTestMapstructAndServiceClassEntityUpdateComponent,
    resolve: {
      fieldTestMapstructAndServiceClassEntity: FieldTestMapstructAndServiceClassEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldTestMapstructAndServiceClassEntityRoute)],
  exports: [RouterModule],
})
export class FieldTestMapstructAndServiceClassEntityRoutingModule {}
