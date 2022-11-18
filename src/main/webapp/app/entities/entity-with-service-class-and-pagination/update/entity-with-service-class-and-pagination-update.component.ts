import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  EntityWithServiceClassAndPaginationFormService,
  EntityWithServiceClassAndPaginationFormGroup,
} from './entity-with-service-class-and-pagination-form.service';
import { IEntityWithServiceClassAndPagination } from '../entity-with-service-class-and-pagination.model';
import { EntityWithServiceClassAndPaginationService } from '../service/entity-with-service-class-and-pagination.service';

@Component({
  selector: 'jhi-entity-with-service-class-and-pagination-update',
  templateUrl: './entity-with-service-class-and-pagination-update.component.html',
})
export class EntityWithServiceClassAndPaginationUpdateComponent implements OnInit {
  isSaving = false;
  entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination | null = null;

  editForm: EntityWithServiceClassAndPaginationFormGroup =
    this.entityWithServiceClassAndPaginationFormService.createEntityWithServiceClassAndPaginationFormGroup();

  constructor(
    protected entityWithServiceClassAndPaginationService: EntityWithServiceClassAndPaginationService,
    protected entityWithServiceClassAndPaginationFormService: EntityWithServiceClassAndPaginationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceClassAndPagination }) => {
      this.entityWithServiceClassAndPagination = entityWithServiceClassAndPagination;
      if (entityWithServiceClassAndPagination) {
        this.updateForm(entityWithServiceClassAndPagination);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithServiceClassAndPagination = this.entityWithServiceClassAndPaginationFormService.getEntityWithServiceClassAndPagination(
      this.editForm
    );
    if (entityWithServiceClassAndPagination.id !== null) {
      this.subscribeToSaveResponse(this.entityWithServiceClassAndPaginationService.update(entityWithServiceClassAndPagination));
    } else {
      this.subscribeToSaveResponse(this.entityWithServiceClassAndPaginationService.create(entityWithServiceClassAndPagination));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceClassAndPagination>>): void {
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

  protected updateForm(entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination): void {
    this.entityWithServiceClassAndPagination = entityWithServiceClassAndPagination;
    this.entityWithServiceClassAndPaginationFormService.resetForm(this.editForm, entityWithServiceClassAndPagination);
  }
}
