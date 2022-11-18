import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  EntityWithServiceImplAndPaginationFormService,
  EntityWithServiceImplAndPaginationFormGroup,
} from './entity-with-service-impl-and-pagination-form.service';
import { IEntityWithServiceImplAndPagination } from '../entity-with-service-impl-and-pagination.model';
import { EntityWithServiceImplAndPaginationService } from '../service/entity-with-service-impl-and-pagination.service';

@Component({
  selector: 'jhi-entity-with-service-impl-and-pagination-update',
  templateUrl: './entity-with-service-impl-and-pagination-update.component.html',
})
export class EntityWithServiceImplAndPaginationUpdateComponent implements OnInit {
  isSaving = false;
  entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination | null = null;

  editForm: EntityWithServiceImplAndPaginationFormGroup =
    this.entityWithServiceImplAndPaginationFormService.createEntityWithServiceImplAndPaginationFormGroup();

  constructor(
    protected entityWithServiceImplAndPaginationService: EntityWithServiceImplAndPaginationService,
    protected entityWithServiceImplAndPaginationFormService: EntityWithServiceImplAndPaginationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceImplAndPagination }) => {
      this.entityWithServiceImplAndPagination = entityWithServiceImplAndPagination;
      if (entityWithServiceImplAndPagination) {
        this.updateForm(entityWithServiceImplAndPagination);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entityWithServiceImplAndPagination = this.entityWithServiceImplAndPaginationFormService.getEntityWithServiceImplAndPagination(
      this.editForm
    );
    if (entityWithServiceImplAndPagination.id !== null) {
      this.subscribeToSaveResponse(this.entityWithServiceImplAndPaginationService.update(entityWithServiceImplAndPagination));
    } else {
      this.subscribeToSaveResponse(this.entityWithServiceImplAndPaginationService.create(entityWithServiceImplAndPagination));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntityWithServiceImplAndPagination>>): void {
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

  protected updateForm(entityWithServiceImplAndPagination: IEntityWithServiceImplAndPagination): void {
    this.entityWithServiceImplAndPagination = entityWithServiceImplAndPagination;
    this.entityWithServiceImplAndPaginationFormService.resetForm(this.editForm, entityWithServiceImplAndPagination);
  }
}
