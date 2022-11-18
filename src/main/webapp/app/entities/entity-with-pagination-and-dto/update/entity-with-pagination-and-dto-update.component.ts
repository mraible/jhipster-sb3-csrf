import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EntityWithPaginationAndDTOFormService, EntityWithPaginationAndDTOFormGroup } from './entity-with-pagination-and-dto-form.service';
import { IEntityWithPaginationAndDTO } from '../entity-with-pagination-and-dto.model';
import { EntityWithPaginationAndDTOService } from '../service/entity-with-pagination-and-dto.service';

@Component({
  selector: 'jhi-entity-with-pagination-and-dto-update',
  templateUrl: './entity-with-pagination-and-dto-update.component.html',
})
export class EntityWithPaginationAndDTOUpdateComponent implements OnInit {
  isSaving = false;
  entityWithPaginationAndDTO: IEntityWithPaginationAndDTO | null = null;

  editForm: EntityWithPaginationAndDTOFormGroup = this.entityWithPaginationAndDTOFormService.createEntityWithPaginationAndDTOFormGroup();

  constructor(
    protected entityWithPaginationAndDTOService: EntityWithPaginationAndDTOService,
    protected entityWithPaginationAndDTOFormService: EntityWithPaginationAndDTOFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithPaginationAndDTO }) => {
      this.entityWithPaginationAndDTO = entityWithPaginationAndDTO;
      if (entityWithPaginationAndDTO) {
        this.updateForm(entityWithPaginationAndDTO);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithPaginationAndDTO = this.entityWithPaginationAndDTOFormService.getEntityWithPaginationAndDTO(this.editForm);
    if (entityWithPaginationAndDTO.id !== null) {
      this.subscribeToSaveResponse(this.entityWithPaginationAndDTOService.update(entityWithPaginationAndDTO));
    } else {
      this.subscribeToSaveResponse(this.entityWithPaginationAndDTOService.create(entityWithPaginationAndDTO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithPaginationAndDTO>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(entityWithPaginationAndDTO: IEntityWithPaginationAndDTO): void {
    this.entityWithPaginationAndDTO = entityWithPaginationAndDTO;
    this.entityWithPaginationAndDTOFormService.resetForm(this.editForm, entityWithPaginationAndDTO);
  }
}
