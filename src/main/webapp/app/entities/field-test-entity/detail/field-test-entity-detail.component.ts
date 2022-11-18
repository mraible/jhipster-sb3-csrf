import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldTestEntity } from '../field-test-entity.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-field-test-entity-detail',
  templateUrl: './field-test-entity-detail.component.html',
})
export class FieldTestEntityDetailComponent implements OnInit {
  fieldTestEntity: IFieldTestEntity | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestEntity }) => {
      this.fieldTestEntity = fieldTestEntity;
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
