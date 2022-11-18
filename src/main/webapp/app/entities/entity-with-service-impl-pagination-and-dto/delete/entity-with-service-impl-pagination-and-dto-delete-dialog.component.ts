import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from '../service/entity-with-service-impl-pagination-and-dto.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entity-with-service-impl-pagination-and-dto-delete-dialog.component.html',
})
export class EntityWithServiceImplPaginationAndDTODeleteDialogComponent {
  entityWithServiceImplPaginationAndDTO?: IEntityWithServiceImplPaginationAndDTO;

  constructor(
    protected entityWithServiceImplPaginationAndDTOService: EntityWithServiceImplPaginationAndDTOService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.entityWithServiceImplPaginationAndDTOService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
