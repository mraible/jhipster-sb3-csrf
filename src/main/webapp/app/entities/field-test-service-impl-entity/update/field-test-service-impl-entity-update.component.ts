import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FieldTestServiceImplEntityFormService, FieldTestServiceImplEntityFormGroup } from './field-test-service-impl-entity-form.service';
import { IFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from '../service/field-test-service-impl-entity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

@Component({
  selector: 'jhi-field-test-service-impl-entity-update',
  templateUrl: './field-test-service-impl-entity-update.component.html',
})
export class FieldTestServiceImplEntityUpdateComponent implements OnInit {
  isSaving = false;
  fieldTestServiceImplEntity: IFieldTestServiceImplEntity | null = null;
  enumFieldClassValues = Object.keys(EnumFieldClass);
  enumRequiredFieldClassValues = Object.keys(EnumRequiredFieldClass);

  editForm: FieldTestServiceImplEntityFormGroup = this.fieldTestServiceImplEntityFormService.createFieldTestServiceImplEntityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fieldTestServiceImplEntityService: FieldTestServiceImplEntityService,
    protected fieldTestServiceImplEntityFormService: FieldTestServiceImplEntityFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestServiceImplEntity }) => {
      this.fieldTestServiceImplEntity = fieldTestServiceImplEntity;
      if (fieldTestServiceImplEntity) {
        this.updateForm(fieldTestServiceImplEntity);
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
    const fieldTestServiceImplEntity = this.fieldTestServiceImplEntityFormService.getFieldTestServiceImplEntity(this.editForm);
    if (fieldTestServiceImplEntity.id !== null) {
      this.subscribeToSaveResponse(this.fieldTestServiceImplEntityService.update(fieldTestServiceImplEntity));
    } else {
      this.subscribeToSaveResponse(this.fieldTestServiceImplEntityService.create(fieldTestServiceImplEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestServiceImplEntity>>): void {
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

  protected updateForm(fieldTestServiceImplEntity: IFieldTestServiceImplEntity): void {
    this.fieldTestServiceImplEntity = fieldTestServiceImplEntity;
    this.fieldTestServiceImplEntityFormService.resetForm(this.editForm, fieldTestServiceImplEntity);
  }
}
