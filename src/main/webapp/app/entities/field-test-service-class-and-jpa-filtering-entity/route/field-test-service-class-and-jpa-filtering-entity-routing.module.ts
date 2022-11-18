import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FieldTestServiceClassAndJpaFilteringEntityComponent } from '../list/field-test-service-class-and-jpa-filtering-entity.component';
import { FieldTestServiceClassAndJpaFilteringEntityDetailComponent } from '../detail/field-test-service-class-and-jpa-filtering-entity-detail.component';
import { FieldTestServiceClassAndJpaFilteringEntityUpdateComponent } from '../update/field-test-service-class-and-jpa-filtering-entity-update.component';
import { FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService } from './field-test-service-class-and-jpa-filtering-entity-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fieldTestServiceClassAndJpaFilteringEntityRoute: Routes = [
  {
    path: '',
    component: FieldTestServiceClassAndJpaFilteringEntityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FieldTestServiceClassAndJpaFilteringEntityDetailComponent,
    resolve: {
      fieldTestServiceClassAndJpaFilteringEntity: FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FieldTestServiceClassAndJpaFilteringEntityUpdateComponent,
    resolve: {
      fieldTestServiceClassAndJpaFilteringEntity: FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FieldTestServiceClassAndJpaFilteringEntityUpdateComponent,
    resolve: {
      fieldTestServiceClassAndJpaFilteringEntity: FieldTestServiceClassAndJpaFilteringEntityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fieldTestServiceClassAndJpaFilteringEntityRoute)],
  exports: [RouterModule],
})
export class FieldTestServiceClassAndJpaFilteringEntityRoutingModule {}
