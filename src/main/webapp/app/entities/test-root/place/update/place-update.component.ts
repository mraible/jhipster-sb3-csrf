import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PlaceFormService, PlaceFormGroup } from './place-form.service';
import { IPlace } from '../place.model';
import { PlaceService } from '../service/place.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDivision } from 'app/entities/test-root/division/division.model';
import { DivisionService } from 'app/entities/test-root/division/service/division.service';

@Component({
  selector: 'jhi-place-update',
  templateUrl: './place-update.component.html',
})
export class PlaceUpdateComponent implements OnInit {
  isSaving = false;
  place: IPlace | null = null;

  divisionsSharedCollection: IDivision[] = [];

  editForm: PlaceFormGroup = this.placeFormService.createPlaceFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected placeService: PlaceService,
    protected placeFormService: PlaceFormService,
    protected divisionService: DivisionService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareDivision = (o1: IDivision | null, o2: IDivision | null): boolean => this.divisionService.compareDivision(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ place }) => {
      this.place = place;
      if (place) {
        this.updateForm(place);
      }

      this.loadRelationshipsOptions();
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const place = this.placeFormService.getPlace(this.editForm);
    if (place.id !== null) {
      this.subscribeToSaveResponse(this.placeService.update(place));
    } else {
      this.subscribeToSaveResponse(this.placeService.create(place));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlace>>): void {
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

  protected updateForm(place: IPlace): void {
    this.place = place;
    this.placeFormService.resetForm(this.editForm, place);

    this.divisionsSharedCollection = this.divisionService.addDivisionToCollectionIfMissing<IDivision>(
      this.divisionsSharedCollection,
      ...(place.preferredDivisions ?? []),
      place.owner
    );
  }

  protected loadRelationshipsOptions(): void {
    this.divisionService
      .query()
      .pipe(map((res: HttpResponse<IDivision[]>) => res.body ?? []))
      .pipe(
        map((divisions: IDivision[]) =>
          this.divisionService.addDivisionToCollectionIfMissing<IDivision>(
            divisions,
            ...(this.place?.preferredDivisions ?? []),
            this.place?.owner
          )
        )
      )
      .subscribe((divisions: IDivision[]) => (this.divisionsSharedCollection = divisions));
  }
}
