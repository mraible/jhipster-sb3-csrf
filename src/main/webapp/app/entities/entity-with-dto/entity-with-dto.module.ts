import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithDTOComponent } from './list/entity-with-dto.component';
import { EntityWithDTODetailComponent } from './detail/entity-with-dto-detail.component';
import { EntityWithDTOUpdateComponent } from './update/entity-with-dto-update.component';
import { EntityWithDTODeleteDialogComponent } from './delete/entity-with-dto-delete-dialog.component';
import { EntityWithDTORoutingModule } from './route/entity-with-dto-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithDTORoutingModule],
  declarations: [EntityWithDTOComponent, EntityWithDTODetailComponent, EntityWithDTOUpdateComponent, EntityWithDTODeleteDialogComponent],
})
export class EntityWithDTOModule {}
