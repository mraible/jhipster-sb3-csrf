import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithServiceClassPaginationAndDTOComponent } from './list/entity-with-service-class-pagination-and-dto.component';
import { EntityWithServiceClassPaginationAndDTODetailComponent } from './detail/entity-with-service-class-pagination-and-dto-detail.component';
import { EntityWithServiceClassPaginationAndDTOUpdateComponent } from './update/entity-with-service-class-pagination-and-dto-update.component';
import { EntityWithServiceClassPaginationAndDTODeleteDialogComponent } from './delete/entity-with-service-class-pagination-and-dto-delete-dialog.component';
import { EntityWithServiceClassPaginationAndDTORoutingModule } from './route/entity-with-service-class-pagination-and-dto-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithServiceClassPaginationAndDTORoutingModule],
  declarations: [
    EntityWithServiceClassPaginationAndDTOComponent,
    EntityWithServiceClassPaginationAndDTODetailComponent,
    EntityWithServiceClassPaginationAndDTOUpdateComponent,
    EntityWithServiceClassPaginationAndDTODeleteDialogComponent,
  ],
})
export class EntityWithServiceClassPaginationAndDTOModule {}
