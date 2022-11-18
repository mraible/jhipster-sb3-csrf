import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldTestMapstructAndServiceClassEntity } from '../field-test-mapstruct-and-service-class-entity.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-field-test-mapstruct-and-service-class-entity-detail',
  templateUrl: './field-test-mapstruct-and-service-class-entity-detail.component.html',
})
export class FieldTestMapstructAndServiceClassEntityDetailComponent implements OnInit {
  fieldTestMapstructAndServiceClassEntity: IFieldTestMapstructAndServiceClassEntity | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestMapstructAndServiceClassEntity }) => {
      this.fieldTestMapstructAndServiceClassEntity = fieldTestMapstructAndServiceClassEntity;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
