import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldTestServiceImplEntity } from '../field-test-service-impl-entity.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-field-test-service-impl-entity-detail',
  templateUrl: './field-test-service-impl-entity-detail.component.html',
})
export class FieldTestServiceImplEntityDetailComponent implements OnInit {
  fieldTestServiceImplEntity: IFieldTestServiceImplEntity | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestServiceImplEntity }) => {
      this.fieldTestServiceImplEntity = fieldTestServiceImplEntity;
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
