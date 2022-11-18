import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFieldTestEntity } from '../field-test-entity.model';
import { FieldTestEntityService } from '../service/field-test-entity.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './field-test-entity-delete-dialog.component.html',
})
export class FieldTestEntityDeleteDialogComponent {
  fieldTestEntity?: IFieldTestEntity;

  constructor(protected fieldTestEntityService: FieldTestEntityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.fieldTestEntityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
