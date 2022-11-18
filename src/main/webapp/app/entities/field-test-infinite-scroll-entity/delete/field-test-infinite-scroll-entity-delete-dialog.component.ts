import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFieldTestInfiniteScrollEntity } from '../field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityService } from '../service/field-test-infinite-scroll-entity.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './field-test-infinite-scroll-entity-delete-dialog.component.html',
})
export class FieldTestInfiniteScrollEntityDeleteDialogComponent {
  fieldTestInfiniteScrollEntity?: IFieldTestInfiniteScrollEntity;

  constructor(
    protected fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.fieldTestInfiniteScrollEntityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
