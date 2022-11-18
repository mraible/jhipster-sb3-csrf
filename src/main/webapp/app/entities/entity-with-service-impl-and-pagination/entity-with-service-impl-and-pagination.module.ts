import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithServiceImplAndPaginationComponent } from './list/entity-with-service-impl-and-pagination.component';
import { EntityWithServiceImplAndPaginationDetailComponent } from './detail/entity-with-service-impl-and-pagination-detail.component';
import { EntityWithServiceImplAndPaginationUpdateComponent } from './update/entity-with-service-impl-and-pagination-update.component';
import { EntityWithServiceImplAndPaginationDeleteDialogComponent } from './delete/entity-with-service-impl-and-pagination-delete-dialog.component';
import { EntityWithServiceImplAndPaginationRoutingModule } from './route/entity-with-service-impl-and-pagination-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithServiceImplAndPaginationRoutingModule],
  declarations: [
    EntityWithServiceImplAndPaginationComponent,
    EntityWithServiceImplAndPaginationDetailComponent,
    EntityWithServiceImplAndPaginationUpdateComponent,
    EntityWithServiceImplAndPaginationDeleteDialogComponent,
  ],
})
export class EntityWithServiceImplAndPaginationModule {}
