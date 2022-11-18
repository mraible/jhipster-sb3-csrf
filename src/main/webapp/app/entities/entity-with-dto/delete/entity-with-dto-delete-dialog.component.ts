import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntityWithDTO } from '../entity-with-dto.model';
import { EntityWithDTOService } from '../service/entity-with-dto.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entity-with-dto-delete-dialog.component.html',
})
export class EntityWithDTODeleteDialogComponent {
  entityWithDTO?: IEntityWithDTO;

  constructor(protected entityWithDTOService: EntityWithDTOService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.entityWithDTOService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
