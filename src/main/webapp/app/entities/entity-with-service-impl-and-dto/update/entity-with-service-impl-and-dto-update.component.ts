import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  EntityWithServiceImplAndDTOFormService,
  EntityWithServiceImplAndDTOFormGroup,
} from './entity-with-service-impl-and-dto-form.service';
import { IEntityWithServiceImplAndDTO } from '../entity-with-service-impl-and-dto.model';
import { EntityWithServiceImplAndDTOService } from '../service/entity-with-service-impl-and-dto.service';

@Component({
  selector: 'jhi-entity-with-service-impl-and-dto-update',
  templateUrl: './entity-with-service-impl-and-dto-update.component.html',
})
export class EntityWithServiceImplAndDTOUpdateComponent implements OnInit {
  isSaving = false;
  entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO | null = null;

  editForm: EntityWithServiceImplAndDTOFormGroup = this.entityWithServiceImplAndDTOFormService.createEntityWithServiceImplAndDTOFormGroup();

  constructor(
    protected entityWithServiceImplAndDTOService: EntityWithServiceImplAndDTOService,
    protected entityWithServiceImplAndDTOFormService: EntityWithServiceImplAndDTOFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceImplAndDTO }) => {
      this.entityWithServiceImplAndDTO = entityWithServiceImplAndDTO;
      if (entityWithServiceImplAndDTO) {
        this.updateForm(entityWithServiceImplAndDTO);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithServiceImplAndDTO = this.entityWithServiceImplAndDTOFormService.getEntityWithServiceImplAndDTO(this.editForm);
    if (entityWithServiceImplAndDTO.id !== null) {
      this.subscribeToSaveResponse(this.entityWithServiceImplAndDTOService.update(entityWithServiceImplAndDTO));
    } else {
      this.subscribeToSaveResponse(this.entityWithServiceImplAndDTOService.create(entityWithServiceImplAndDTO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceImplAndDTO>>): void {
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

  protected updateForm(entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO): void {
    this.entityWithServiceImplAndDTO = entityWithServiceImplAndDTO;
    this.entityWithServiceImplAndDTOFormService.resetForm(this.editForm, entityWithServiceImplAndDTO);
  }
}
