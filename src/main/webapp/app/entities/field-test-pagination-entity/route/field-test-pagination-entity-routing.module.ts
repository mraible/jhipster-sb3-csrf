import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldTestPaginationEntityComponent } from '../list/field-test-pagination-entity.component';
import { FieldTestPaginationEntityDetailComponent } from '../detail/field-test-pagination-entity-detail.component';
import { FieldTestPaginationEntityUpdateComponent } from '../update/field-test-pagination-entity-update.component';
import { FieldTestPaginationEntityRoutingResolveService } from './field-test-pagination-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldTestPaginationEntityRoute: Routes = [
  {
    path: '',
    component: FieldTestPaginationEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldTestPaginationEntityDetailComponent,
    resolve: {
      fieldTestPaginationEntity: FieldTestPaginationEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldTestPaginationEntityUpdateComponent,
    resolve: {
      fieldTestPaginationEntity: FieldTestPaginationEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldTestPaginationEntityUpdateComponent,
    resolve: {
      fieldTestPaginationEntity: FieldTestPaginationEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldTestPaginationEntityRoute)],
  exports: [RouterModule],
})
export class FieldTestPaginationEntityRoutingModule {}
