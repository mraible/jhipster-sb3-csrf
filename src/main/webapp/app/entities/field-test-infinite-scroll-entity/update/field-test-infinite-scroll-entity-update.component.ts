import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  FieldTestInfiniteScrollEntityFormService,
  FieldTestInfiniteScrollEntityFormGroup,
} from './field-test-infinite-scroll-entity-form.service';
import { IFieldTestInfiniteScrollEntity } from '../field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityService } from '../service/field-test-infinite-scroll-entity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

@Component({
  selector: 'jhi-field-test-infinite-scroll-entity-update',
  templateUrl: './field-test-infinite-scroll-entity-update.component.html',
})
export class FieldTestInfiniteScrollEntityUpdateComponent implements OnInit {
  isSaving = false;
  fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity | null = null;
  enumFieldClassValues = Object.keys(EnumFieldClass);
  enumRequiredFieldClassValues = Object.keys(EnumRequiredFieldClass);

  editForm: FieldTestInfiniteScrollEntityFormGroup =
    this.fieldTestInfiniteScrollEntityFormService.createFieldTestInfiniteScrollEntityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService,
    protected fieldTestInfiniteScrollEntityFormService: FieldTestInfiniteScrollEntityFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestInfiniteScrollEntity }) => {
      this.fieldTestInfiniteScrollEntity = fieldTestInfiniteScrollEntity;
      if (fieldTestInfiniteScrollEntity) {
        this.updateForm(fieldTestInfiniteScrollEntity);
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
    const fieldTestInfiniteScrollEntity = this.fieldTestInfiniteScrollEntityFormService.getFieldTestInfiniteScrollEntity(this.editForm);
    if (fieldTestInfiniteScrollEntity.id !== null) {
      this.subscribeToSaveResponse(this.fieldTestInfiniteScrollEntityService.update(fieldTestInfiniteScrollEntity));
    } else {
      this.subscribeToSaveResponse(this.fieldTestInfiniteScrollEntityService.create(fieldTestInfiniteScrollEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestInfiniteScrollEntity>>): void {
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

  protected updateForm(fieldTestInfiniteScrollEntity: IFieldTestInfiniteScrollEntity): void {
    this.fieldTestInfiniteScrollEntity = fieldTestInfiniteScrollEntity;
    this.fieldTestInfiniteScrollEntityFormService.resetForm(this.editForm, fieldTestInfiniteScrollEntity);
  }
}
