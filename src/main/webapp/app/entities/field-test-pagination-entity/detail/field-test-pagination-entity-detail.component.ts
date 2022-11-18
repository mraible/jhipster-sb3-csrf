import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldTestPaginationEntity } from '../field-test-pagination-entity.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-field-test-pagination-entity-detail',
  templateUrl: './field-test-pagination-entity-detail.component.html',
})
export class FieldTestPaginationEntityDetailComponent implements OnInit {
  fieldTestPaginationEntity: IFieldTestPaginationEntity | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestPaginationEntity }) => {
      this.fieldTestPaginationEntity = fieldTestPaginationEntity;
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
