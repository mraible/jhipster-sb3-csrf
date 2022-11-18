import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithServiceImplPaginationAndDTOComponent } from './list/entity-with-service-impl-pagination-and-dto.component';
import { EntityWithServiceImplPaginationAndDTODetailComponent } from './detail/entity-with-service-impl-pagination-and-dto-detail.component';
import { EntityWithServiceImplPaginationAndDTOUpdateComponent } from './update/entity-with-service-impl-pagination-and-dto-update.component';
import { EntityWithServiceImplPaginationAndDTODeleteDialogComponent } from './delete/entity-with-service-impl-pagination-and-dto-delete-dialog.component';
import { EntityWithServiceImplPaginationAndDTORoutingModule } from './route/entity-with-service-impl-pagination-and-dto-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithServiceImplPaginationAndDTORoutingModule],
  declarations: [
    EntityWithServiceImplPaginationAndDTOComponent,
    EntityWithServiceImplPaginationAndDTODetailComponent,
    EntityWithServiceImplPaginationAndDTOUpdateComponent,
    EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
  ],
})
export class EntityWithServiceImplPaginationAndDTOModule {}
