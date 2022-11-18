import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldTestServiceImplEntityComponent } from '../list/field-test-service-impl-entity.component';
import { FieldTestServiceImplEntityDetailComponent } from '../detail/field-test-service-impl-entity-detail.component';
import { FieldTestServiceImplEntityUpdateComponent } from '../update/field-test-service-impl-entity-update.component';
import { FieldTestServiceImplEntityRoutingResolveService } from './field-test-service-impl-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldTestServiceImplEntityRoute: Routes = [
  {
    path: '',
    component: FieldTestServiceImplEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldTestServiceImplEntityDetailComponent,
    resolve: {
      fieldTestServiceImplEntity: FieldTestServiceImplEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldTestServiceImplEntityUpdateComponent,
    resolve: {
      fieldTestServiceImplEntity: FieldTestServiceImplEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldTestServiceImplEntityUpdateComponent,
    resolve: {
      fieldTestServiceImplEntity: FieldTestServiceImplEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldTestServiceImplEntityRoute)],
  exports: [RouterModule],
})
export class FieldTestServiceImplEntityRoutingModule {}
