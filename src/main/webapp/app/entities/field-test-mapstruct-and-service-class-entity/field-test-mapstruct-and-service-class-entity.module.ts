import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldTestMapstructAndServiceClassEntityComponent } from './list/field-test-mapstruct-and-service-class-entity.component';
import { FieldTestMapstructAndServiceClassEntityDetailComponent } from './detail/field-test-mapstruct-and-service-class-entity-detail.component';
import { FieldTestMapstructAndServiceClassEntityUpdateComponent } from './update/field-test-mapstruct-and-service-class-entity-update.component';
import { FieldTestMapstructAndServiceClassEntityDeleteDialogComponent } from './delete/field-test-mapstruct-and-service-class-entity-delete-dialog.component';
import { FieldTestMapstructAndServiceClassEntityRoutingModule } from './route/field-test-mapstruct-and-service-class-entity-routing.module';

@NgModule({
  imports: [SharedModule, FieldTestMapstructAndServiceClassEntityRoutingModule],
  declarations: [
    FieldTestMapstructAndServiceClassEntityComponent,
    FieldTestMapstructAndServiceClassEntityDetailComponent,
    FieldTestMapstructAndServiceClassEntityUpdateComponent,
    FieldTestMapstructAndServiceClassEntityDeleteDialogComponent,
  ],
})
export class FieldTestMapstructAndServiceClassEntityModule {}
