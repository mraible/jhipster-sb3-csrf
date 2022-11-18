import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldTestServiceClassAndJpaFilteringEntity } from '../field-test-service-class-and-jpa-filtering-entity.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-field-test-service-class-and-jpa-filtering-entity-detail',
  templateUrl: './field-test-service-class-and-jpa-filtering-entity-detail.component.html',
})
export class FieldTestServiceClassAndJpaFilteringEntityDetailComponent implements OnInit {
  fieldTestServiceClassAndJpaFilteringEntity: IFieldTestServiceClassAndJpaFilteringEntity | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fieldTestServiceClassAndJpaFilteringEntity }) => {
      this.fieldTestServiceClassAndJpaFilteringEntity = fieldTestServiceClassAndJpaFilteringEntity;
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
