import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldTestEntityComponent } from '../list/field-test-entity.component';
import { FieldTestEntityDetailComponent } from '../detail/field-test-entity-detail.component';
import { FieldTestEntityUpdateComponent } from '../update/field-test-entity-update.component';
import { FieldTestEntityRoutingResolveService } from './field-test-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldTestEntityRoute: Routes = [
  {
    path: '',
    component: FieldTestEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldTestEntityDetailComponent,
    resolve: {
      fieldTestEntity: FieldTestEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldTestEntityUpdateComponent,
    resolve: {
      fieldTestEntity: FieldTestEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldTestEntityUpdateComponent,
    resolve: {
      fieldTestEntity: FieldTestEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldTestEntityRoute)],
  exports: [RouterModule],
})
export class FieldTestEntityRoutingModule {}
