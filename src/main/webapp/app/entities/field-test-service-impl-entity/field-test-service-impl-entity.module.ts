import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldTestServiceImplEntityComponent } from './list/field-test-service-impl-entity.component';
import { FieldTestServiceImplEntityDetailComponent } from './detail/field-test-service-impl-entity-detail.component';
import { FieldTestServiceImplEntityUpdateComponent } from './update/field-test-service-impl-entity-update.component';
import { FieldTestServiceImplEntityDeleteDialogComponent } from './delete/field-test-service-impl-entity-delete-dialog.component';
import { FieldTestServiceImplEntityRoutingModule } from './route/field-test-service-impl-entity-routing.module';

@NgModule({
  imports: [SharedModule, FieldTestServiceImplEntityRoutingModule],
  declarations: [
    FieldTestServiceImplEntityComponent,
    FieldTestServiceImplEntityDetailComponent,
    FieldTestServiceImplEntityUpdateComponent,
    FieldTestServiceImplEntityDeleteDialogComponent,
  ],
})
export class FieldTestServiceImplEntityModule {}
