import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  FieldTestMapstructAndServiceClassEntityFormService,
  FieldTestMapstructAndServiceClassEntityFormGroup,
} from './field-test-mapstruct-and-service-class-entity-form.service';
import { IFieldTestMapstructAndServiceClassEntity } from '../field-test-mapstruct-and-service-class-entity.model';
import { FieldTestMapstructAndServiceClassEntityService } from '../service/field-test-mapstruct-and-service-class-entity.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { EnumFieldClass } from 'app/entities/enumerations/enum-field-class.model';
import { EnumRequiredFieldClass } from 'app/entities/enumerations/enum-required-field-class.model';

@Component({
  selector: 'jhi-field-test-mapstruct-and-service-class-entity-update',
  templateUrl: './field-test-mapstruct-and-service-class-entity-update.component.html',
})
export class FieldTestMapstructAndServiceClassEntityUpdateComponent implements OnInit {
  isSaving = false;
  fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity | null = null;
  enumFieldClassValues = Object.keys(EnumFieldClass);
  enumRequiredFieldClassValues = Object.keys(EnumRequiredFieldClass);

  editForm: FieldTestMapstructAndServiceClassEntityFormGroup =
    this.fieldTestMapstructAndServiceClassEntityFormService.createFieldTestMapstructAndServiceClassEntityFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fieldTestMapstructAndServiceClassEntityService: FieldTestMapstructAndServiceClassEntityService,
    protected fieldTestMapstructAndServiceClassEntityFormService: FieldTestMapstructAndServiceClassEntityFormService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestMapstructAndServiceClassEntity }) => {
      this.fieldTestMapstructAndServiceClassEntity = fieldTestMapstructAndServiceClassEntity;
      if (fieldTestMapstructAndServiceClassEntity) {
        this.updateForm(fieldTestMapstructAndServiceClassEntity);
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
    const fieldTestMapstructAndServiceClassEntity =
      this.fieldTestMapstructAndServiceClassEntityFormService.getFieldTestMapstructAndServiceClassEntity(this.editForm);
    if (fieldTestMapstructAndServiceClassEntity.id !== null) {
      this.subscribeToSaveResponse(this.fieldTestMapstructAndServiceClassEntityService.update(fieldTestMapstructAndServiceClassEntity));
    } else {
      this.subscribeToSaveResponse(this.fieldTestMapstructAndServiceClassEntityService.create(fieldTestMapstructAndServiceClassEntity));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldTestMapstructAndServiceClassEntity>>): void {
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

  protected updateForm(fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity): void {
    this.fieldTestMapstructAndServiceClassEntity = fieldTestMapstructAndServiceClassEntity;
    this.fieldTestMapstructAndServiceClassEntityFormService.resetForm(this.editForm, fieldTestMapstructAndServiceClassEntity);
  }
}
