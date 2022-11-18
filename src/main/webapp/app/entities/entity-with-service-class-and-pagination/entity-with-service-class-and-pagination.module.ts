import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithServiceClassAndPaginationComponent } from './list/entity-with-service-class-and-pagination.component';
import { EntityWithServiceClassAndPaginationDetailComponent } from './detail/entity-with-service-class-and-pagination-detail.component';
import { EntityWithServiceClassAndPaginationUpdateComponent } from './update/entity-with-service-class-and-pagination-update.component';
import { EntityWithServiceClassAndPaginationDeleteDialogComponent } from './delete/entity-with-service-class-and-pagination-delete-dialog.component';
import { EntityWithServiceClassAndPaginationRoutingModule } from './route/entity-with-service-class-and-pagination-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithServiceClassAndPaginationRoutingModule],
  declarations: [
    EntityWithServiceClassAndPaginationComponent,
    EntityWithServiceClassAndPaginationDetailComponent,
    EntityWithServiceClassAndPaginationUpdateComponent,
    EntityWithServiceClassAndPaginationDeleteDialogComponent,
  ],
})
export class EntityWithServiceClassAndPaginationModule {}
