import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldTestInfiniteScrollEntityComponent } from '../list/field-test-infinite-scroll-entity.component';
import { FieldTestInfiniteScrollEntityDetailComponent } from '../detail/field-test-infinite-scroll-entity-detail.component';
import { FieldTestInfiniteScrollEntityUpdateComponent } from '../update/field-test-infinite-scroll-entity-update.component';
import { FieldTestInfiniteScrollEntityRoutingResolveService } from './field-test-infinite-scroll-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldTestInfiniteScrollEntityRoute: Routes = [
  {
    path: '',
    component: FieldTestInfiniteScrollEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldTestInfiniteScrollEntityDetailComponent,
    resolve: {
      fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldTestInfiniteScrollEntityUpdateComponent,
    resolve: {
      fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldTestInfiniteScrollEntityUpdateComponent,
    resolve: {
      fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldTestInfiniteScrollEntityRoute)],
  exports: [RouterModule],
})
export class FieldTestInfiniteScrollEntityRoutingModule {}
