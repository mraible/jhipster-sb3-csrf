import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntityWithServiceClassPaginationAndDTO } from '../entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOService } from '../service/entity-with-service-class-pagination-and-dto.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entity-with-service-class-pagination-and-dto-delete-dialog.component.html',
})
export class EntityWithServiceClassPaginationAndDTODeleteDialogComponent {
  entityWithServiceClassPaginationAndDTO?: IEntityWithServiceClassPaginationAndDTO;

  constructor(
    protected entityWithServiceClassPaginationAndDTOService: EntityWithServiceClassPaginationAndDTOService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.entityWithServiceClassPaginationAndDTOService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
