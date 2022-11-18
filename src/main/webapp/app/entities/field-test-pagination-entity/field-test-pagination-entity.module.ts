import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldTestPaginationEntityComponent } from './list/field-test-pagination-entity.component';
import { FieldTestPaginationEntityDetailComponent } from './detail/field-test-pagination-entity-detail.component';
import { FieldTestPaginationEntityUpdateComponent } from './update/field-test-pagination-entity-update.component';
import { FieldTestPaginationEntityDeleteDialogComponent } from './delete/field-test-pagination-entity-delete-dialog.component';
import { FieldTestPaginationEntityRoutingModule } from './route/field-test-pagination-entity-routing.module';

@NgModule({
  imports: [SharedModule, FieldTestPaginationEntityRoutingModule],
  declarations: [
    FieldTestPaginationEntityComponent,
    FieldTestPaginationEntityDetailComponent,
    FieldTestPaginationEntityUpdateComponent,
    FieldTestPaginationEntityDeleteDialogComponent,
  ],
})
export class FieldTestPaginationEntityModule {}
