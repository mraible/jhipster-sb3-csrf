import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  EntityWithServiceClassPaginationAndDTOFormService,
  EntityWithServiceClassPaginationAndDTOFormGroup,
} from './entity-with-service-class-pagination-and-dto-form.service';
import { IEntityWithServiceClassPaginationAndDTO } from '../entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOService } from '../service/entity-with-service-class-pagination-and-dto.service';

@Component({
  selector: 'jhi-entity-with-service-class-pagination-and-dto-update',
  templateUrl: './entity-with-service-class-pagination-and-dto-update.component.html',
})
export class EntityWithServiceClassPaginationAndDTOUpdateComponent implements OnInit {
  isSaving = false;
  entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO | null = null;

  editForm: EntityWithServiceClassPaginationAndDTOFormGroup =
    this.entityWithServiceClassPaginationAndDTOFormService.createEntityWithServiceClassPaginationAndDTOFormGroup();

  constructor(
    protected entityWithServiceClassPaginationAndDTOService: EntityWithServiceClassPaginationAndDTOService,
    protected entityWithServiceClassPaginationAndDTOFormService: EntityWithServiceClassPaginationAndDTOFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceClassPaginationAndDTO }) => {
      this.entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
      if (entityWithServiceClassPaginationAndDTO) {
        this.updateForm(entityWithServiceClassPaginationAndDTO);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithServiceClassPaginationAndDTO =
      this.entityWithServiceClassPaginationAndDTOFormService.getEntityWithServiceClassPaginationAndDTO(this.editForm);
    if (entityWithServiceClassPaginationAndDTO.id !== null) {
      this.subscribeToSaveResponse(this.entityWithServiceClassPaginationAndDTOService.update(entityWithServiceClassPaginationAndDTO));
    } else {
      this.subscribeToSaveResponse(this.entityWithServiceClassPaginationAndDTOService.create(entityWithServiceClassPaginationAndDTO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceClassPaginationAndDTO>>): void {
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

  protected updateForm(entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO): void {
    this.entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
    this.entityWithServiceClassPaginationAndDTOFormService.resetForm(this.editForm, entityWithServiceClassPaginationAndDTO);
  }
}
