import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DivisionFormService, DivisionFormGroup } from './division-form.service';
import { IDivision } from '../division.model';
import { DivisionService } from '../service/division.service';
import { DivisionType } from 'app/entities/enumerations/division-type.model';

@Component({
  selector: 'jhi-division-update',
  templateUrl: './division-update.component.html',
})
export class DivisionUpdateComponent implements OnInit {
  isSaving = false;
  division: IDivision | null = null;
  divisionTypeValues = Object.keys(DivisionType);

  editForm: DivisionFormGroup = this.divisionFormService.createDivisionFormGroup();

  constructor(
    protected divisionService: DivisionService,
    protected divisionFormService: DivisionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ division }) => {
      this.division = division;
      if (division) {
        this.updateForm(division);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const division = this.divisionFormService.getDivision(this.editForm);
    if (division.id !== null) {
      this.subscribeToSaveResponse(this.divisionService.update(division));
    } else {
      this.subscribeToSaveResponse(this.divisionService.create(division));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDivision>>): void {
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

  protected updateForm(division: IDivision): void {
    this.division = division;
    this.divisionFormService.resetForm(this.editForm, division);
  }
}
