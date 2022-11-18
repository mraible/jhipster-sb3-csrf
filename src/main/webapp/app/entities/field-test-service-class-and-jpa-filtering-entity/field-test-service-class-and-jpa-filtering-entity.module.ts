import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldTestServiceClassAndJpaFilteringEntityComponent } from './list/field-test-service-class-and-jpa-filtering-entity.component';
import { FieldTestServiceClassAndJpaFilteringEntityDetailComponent } from './detail/field-test-service-class-and-jpa-filtering-entity-detail.component';
import { FieldTestServiceClassAndJpaFilteringEntityUpdateComponent } from './update/field-test-service-class-and-jpa-filtering-entity-update.component';
import { FieldTestServiceClassAndJpaFilteringEntityDeleteDialogComponent } from './delete/field-test-service-class-and-jpa-filtering-entity-delete-dialog.component';
import { FieldTestServiceClassAndJpaFilteringEntityRoutingModule } from './route/field-test-service-class-and-jpa-filtering-entity-routing.module';

@NgModule({
  imports: [SharedModule, FieldTestServiceClassAndJpaFilteringEntityRoutingModule],
  declarations: [
    FieldTestServiceClassAndJpaFilteringEntityComponent,
    FieldTestServiceClassAndJpaFilteringEntityDetailComponent,
    FieldTestServiceClassAndJpaFilteringEntityUpdateComponent,
    FieldTestServiceClassAndJpaFilteringEntityDeleteDialogComponent,
  ],
})
export class FieldTestServiceClassAndJpaFilteringEntityModule {}
