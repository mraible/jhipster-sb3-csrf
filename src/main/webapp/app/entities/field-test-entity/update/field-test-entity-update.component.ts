import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FieldTestEntityFormService, FieldTestEntityFormGroup } from './field-test-entity-form.service';
import { IFieldTestEntity } from '../field-test-entity.model';
import { FieldTestEntityService } from '../service/field-test-entity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

@Component({
  selector: 'jhi-field-test-entity-update',
  templateUrl: './field-test-entity-update.component.html',
})
export class FieldTestEntityUpdateComponent implements OnInit {
  isSaving = false;
  fieldTestEntity: IFieldTestEntity | null = null;
  enumFieldClassValues = Object.keys(EnumFieldClass);
  enumRequiredFieldClassValues = Object.keys(EnumRequiredFieldClass);

  editForm: FieldTestEntityFormGroup = this.fieldTestEntityFormService.createFieldTestEntityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fieldTestEntityService: FieldTestEntityService,
    protected fieldTestEntityFormService: FieldTestEntityFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestEntity }) => {
      this.fieldTestEntity = fieldTestEntity;
      if (fieldTestEntity) {
        this.updateForm(fieldTestEntity);
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
    const fieldTestEntity = this.fieldTestEntityFormService.getFieldTestEntity(this.editForm);
    if (fieldTestEntity.id !== null) {
      this.subscribeToSaveResponse(this.fieldTestEntityService.update(fieldTestEntity));
    } else {
      this.subscribeToSaveResponse(this.fieldTestEntityService.create(fieldTestEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestEntity>>): void {
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

  protected updateForm(fieldTestEntity: IFieldTestEntity): void {
    this.fieldTestEntity = fieldTestEntity;
    this.fieldTestEntityFormService.resetForm(this.editForm, fieldTestEntity);
  }
}
