import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithPaginationAndDTOComponent } from './list/entity-with-pagination-and-dto.component';
import { EntityWithPaginationAndDTODetailComponent } from './detail/entity-with-pagination-and-dto-detail.component';
import { EntityWithPaginationAndDTOUpdateComponent } from './update/entity-with-pagination-and-dto-update.component';
import { EntityWithPaginationAndDTODeleteDialogComponent } from './delete/entity-with-pagination-and-dto-delete-dialog.component';
import { EntityWithPaginationAndDTORoutingModule } from './route/entity-with-pagination-and-dto-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithPaginationAndDTORoutingModule],
  declarations: [
    EntityWithPaginationAndDTOComponent,
    EntityWithPaginationAndDTODetailComponent,
    EntityWithPaginationAndDTOUpdateComponent,
    EntityWithPaginationAndDTODeleteDialogComponent,
  ],
})
export class EntityWithPaginationAndDTOModule {}
