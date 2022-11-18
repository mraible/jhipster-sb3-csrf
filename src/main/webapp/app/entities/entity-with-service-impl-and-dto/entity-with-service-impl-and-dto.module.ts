import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityWithServiceImplAndDTOComponent } from './list/entity-with-service-impl-and-dto.component';
import { EntityWithServiceImplAndDTODetailComponent } from './detail/entity-with-service-impl-and-dto-detail.component';
import { EntityWithServiceImplAndDTOUpdateComponent } from './update/entity-with-service-impl-and-dto-update.component';
import { EntityWithServiceImplAndDTODeleteDialogComponent } from './delete/entity-with-service-impl-and-dto-delete-dialog.component';
import { EntityWithServiceImplAndDTORoutingModule } from './route/entity-with-service-impl-and-dto-routing.module';

@NgModule({
  imports: [SharedModule, EntityWithServiceImplAndDTORoutingModule],
  declarations: [
    EntityWithServiceImplAndDTOComponent,
    EntityWithServiceImplAndDTODetailComponent,
    EntityWithServiceImplAndDTOUpdateComponent,
    EntityWithServiceImplAndDTODeleteDialogComponent,
  ],
})
export class EntityWithServiceImplAndDTOModule {}
