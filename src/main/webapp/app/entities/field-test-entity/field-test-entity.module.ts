import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldTestEntityComponent } from './list/field-test-entity.component';
import { FieldTestEntityDetailComponent } from './detail/field-test-entity-detail.component';
import { FieldTestEntityUpdateComponent } from './update/field-test-entity-update.component';
import { FieldTestEntityDeleteDialogComponent } from './delete/field-test-entity-delete-dialog.component';
import { FieldTestEntityRoutingModule } from './route/field-test-entity-routing.module';

@NgModule({
  imports: [SharedModule, FieldTestEntityRoutingModule],
  declarations: [
    FieldTestEntityComponent,
    FieldTestEntityDetailComponent,
    FieldTestEntityUpdateComponent,
    FieldTestEntityDeleteDialogComponent,
  ],
})
export class FieldTestEntityModule {}
