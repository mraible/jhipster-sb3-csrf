import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  FieldTestServiceClassAndJpaFilteringEntityFormService,
  FieldTestServiceClassAndJpaFilteringEntityFormGroup,
} from './field-test-service-class-and-jpa-filtering-entity-form.service';
import { IFieldTestServiceClassAndJpaFilteringEntity } from '../field-test-service-class-and-jpa-filtering-entity.model';
import { FieldTestServiceClassAndJpaFilteringEntityService } from '../service/field-test-service-class-and-jpa-filtering-entity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

@Component({
  selector: 'jhi-field-test-service-class-and-jpa-filtering-entity-update',
  templateUrl: './field-test-service-class-and-jpa-filtering-entity-update.component.html',
})
export class FieldTestServiceClassAndJpaFilteringEntityUpdateComponent implements OnInit {
  isSaving = false;
  fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity | null = null;
  enumFieldClassValues = Object.keys(EnumFieldClass);
  enumRequiredFieldClassValues = Object.keys(EnumRequiredFieldClass);

  editForm: FieldTestServiceClassAndJpaFilteringEntityFormGroup =
    this.fieldTestServiceClassAndJpaFilteringEntityFormService.createFieldTestServiceClassAndJpaFilteringEntityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fieldTestServiceClassAndJpaFilteringEntityService: FieldTestServiceClassAndJpaFilteringEntityService,
    protected fieldTestServiceClassAndJpaFilteringEntityFormService: FieldTestServiceClassAndJpaFilteringEntityFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestServiceClassAndJpaFilteringEntity }) => {
      this.fieldTestServiceClassAndJpaFilteringEntity = fieldTestServiceClassAndJpaFilteringEntity;
      if (fieldTestServiceClassAndJpaFilteringEntity) {
        this.updateForm(fieldTestServiceClassAndJpaFilteringEntity);
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
    const fieldTestServiceClassAndJpaFilteringEntity =
      this.fieldTestServiceClassAndJpaFilteringEntityFormService.getFieldTestServiceClassAndJpaFilteringEntity(this.editForm);
    if (fieldTestServiceClassAndJpaFilteringEntity.id !== null) {
      this.subscribeToSaveResponse(
        this.fieldTestServiceClassAndJpaFilteringEntityService.update(fieldTestServiceClassAndJpaFilteringEntity)
      );
    } else {
      this.subscribeToSaveResponse(
        this.fieldTestServiceClassAndJpaFilteringEntityService.create(fieldTestServiceClassAndJpaFilteringEntity)
      );
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestServiceClassAndJpaFilteringEntity>>): void {
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

  protected updateForm(fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity): void {
    this.fieldTestServiceClassAndJpaFilteringEntity = fieldTestServiceClassAndJpaFilteringEntity;
    this.fieldTestServiceClassAndJpaFilteringEntityFormService.resetForm(this.editForm, fieldTestServiceClassAndJpaFilteringEntity);
  }
}
