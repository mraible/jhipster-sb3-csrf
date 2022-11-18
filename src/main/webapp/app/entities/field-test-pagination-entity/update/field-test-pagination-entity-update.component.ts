import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FieldTestPaginationEntityFormService, FieldTestPaginationEntityFormGroup } from './field-test-pagination-entity-form.service';
import { IFieldTestPaginationEntity } from '../field-test-pagination-entity.model';
import { FieldTestPaginationEntityService } from '../service/field-test-pagination-entity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

@Component({
  selector: 'jhi-field-test-pagination-entity-update',
  templateUrl: './field-test-pagination-entity-update.component.html',
})
export class FieldTestPaginationEntityUpdateComponent implements OnInit {
  isSaving = false;
  fieldTestPaginationEntity: IFieldTestPaginationEntity | null = null;
  enumFieldClassValues = Object.keys(EnumFieldClass);
  enumRequiredFieldClassValues = Object.keys(EnumRequiredFieldClass);

  editForm: FieldTestPaginationEntityFormGroup = this.fieldTestPaginationEntityFormService.createFieldTestPaginationEntityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fieldTestPaginationEntityService: FieldTestPaginationEntityService,
    protected fieldTestPaginationEntityFormService: FieldTestPaginationEntityFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestPaginationEntity }) => {
      this.fieldTestPaginationEntity = fieldTestPaginationEntity;
      if (fieldTestPaginationEntity) {
        this.updateForm(fieldTestPaginationEntity);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('sampleWebfluxMongodbOauth2App.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fieldTestPaginationEntity = this.fieldTestPaginationEntityFormService.getFieldTestPaginationEntity(this.editForm);
    if (fieldTestPaginationEntity.id !== null) {
      this.subscribeToSaveResponse(this.fieldTestPaginationEntityService.update(fieldTestPaginationEntity));
    } else {
      this.subscribeToSaveResponse(this.fieldTestPaginationEntityService.create(fieldTestPaginationEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestPaginationEntity>>): void {
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

  protected updateForm(fieldTestPaginationEntity: IFieldTestPaginationEntity): void {
    this.fieldTestPaginationEntity = fieldTestPaginationEntity;
    this.fieldTestPaginationEntityFormService.resetForm(this.editForm, fieldTestPaginationEntity);
  }
}
