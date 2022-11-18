import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FieldTestInfiniteScrollEntityComponent } from './list/field-test-infinite-scroll-entity.component';
import { FieldTestInfiniteScrollEntityDetailComponent } from './detail/field-test-infinite-scroll-entity-detail.component';
import { FieldTestInfiniteScrollEntityUpdateComponent } from './update/field-test-infinite-scroll-entity-update.component';
import { FieldTestInfiniteScrollEntityDeleteDialogComponent } from './delete/field-test-infinite-scroll-entity-delete-dialog.component';
import { FieldTestInfiniteScrollEntityRoutingModule } from './route/field-test-infinite-scroll-entity-routing.module';

@NgModule({
  imports: [SharedModule, FieldTestInfiniteScrollEntityRoutingModule],
  declarations: [
    FieldTestInfiniteScrollEntityComponent,
    FieldTestInfiniteScrollEntityDetailComponent,
    FieldTestInfiniteScrollEntityUpdateComponent,
    FieldTestInfiniteScrollEntityDeleteDialogComponent,
  ],
})
export class FieldTestInfiniteScrollEntityModule {}
