import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  EntityWithServiceImplPaginationAndDTOFormService,
  EntityWithServiceImplPaginationAndDTOFormGroup,
} from './entity-with-service-impl-pagination-and-dto-form.service';
import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from '../service/entity-with-service-impl-pagination-and-dto.service';

@Component({
  selector: 'jhi-entity-with-service-impl-pagination-and-dto-update',
  templateUrl: './entity-with-service-impl-pagination-and-dto-update.component.html',
})
export class EntityWithServiceImplPaginationAndDTOUpdateComponent implements OnInit {
  isSaving = false;
  entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO | null = null;

  editForm: EntityWithServiceImplPaginationAndDTOFormGroup =
    this.entityWithServiceImplPaginationAndDTOFormService.createEntityWithServiceImplPaginationAndDTOFormGroup();

  constructor(
    protected entityWithServiceImplPaginationAndDTOService: EntityWithServiceImplPaginationAndDTOService,
    protected entityWithServiceImplPaginationAndDTOFormService: EntityWithServiceImplPaginationAndDTOFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceImplPaginationAndDTO }) => {
      this.entityWithServiceImplPaginationAndDTO = entityWithServiceImplPaginationAndDTO;
      if (entityWithServiceImplPaginationAndDTO) {
        this.updateForm(entityWithServiceImplPaginationAndDTO);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithServiceImplPaginationAndDTO =
      this.entityWithServiceImplPaginationAndDTOFormService.getEntityWithServiceImplPaginationAndDTO(this.editForm);
    if (entityWithServiceImplPaginationAndDTO.id !== null) {
      this.subscribeToSaveResponse(this.entityWithServiceImplPaginationAndDTOService.update(entityWithServiceImplPaginationAndDTO));
    } else {
      this.subscribeToSaveResponse(this.entityWithServiceImplPaginationAndDTOService.create(entityWithServiceImplPaginationAndDTO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceImplPaginationAndDTO>>): void {
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

  protected updateForm(entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO): void {
    this.entityWithServiceImplPaginationAndDTO = entityWithServiceImplPaginationAndDTO;
    this.entityWithServiceImplPaginationAndDTOFormService.resetForm(this.editForm, entityWithServiceImplPaginationAndDTO);
  }
}
