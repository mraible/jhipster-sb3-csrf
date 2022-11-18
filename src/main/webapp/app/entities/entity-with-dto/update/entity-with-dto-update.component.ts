import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EntityWithDTOFormService, EntityWithDTOFormGroup } from './entity-with-dto-form.service';
import { IEntityWithDTO } from '../entity-with-dto.model';
import { EntityWithDTOService } from '../service/entity-with-dto.service';

@Component({
  selector: 'jhi-entity-with-dto-update',
  templateUrl: './entity-with-dto-update.component.html',
})
export class EntityWithDTOUpdateComponent implements OnInit {
  isSaving = false;
  entityWithDTO: IEntityWithDTO | null = null;

  editForm: EntityWithDTOFormGroup = this.entityWithDTOFormService.createEntityWithDTOFormGroup();

  constructor(
    protected entityWithDTOService: EntityWithDTOService,
    protected entityWithDTOFormService: EntityWithDTOFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithDTO }) => {
      this.entityWithDTO = entityWithDTO;
      if (entityWithDTO) {
        this.updateForm(entityWithDTO);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithDTO = this.entityWithDTOFormService.getEntityWithDTO(this.editForm);
    if (entityWithDTO.id !== null) {
      this.subscribeToSaveResponse(this.entityWithDTOService.update(entityWithDTO));
    } else {
      this.subscribeToSaveResponse(this.entityWithDTOService.create(entityWithDTO));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithDTO>>): void {
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

  protected updateForm(entityWithDTO: IEntityWithDTO): void {
    this.entityWithDTO = entityWithDTO;
    this.entityWithDTOFormService.resetForm(this.editForm, entityWithDTO);
  }
}
