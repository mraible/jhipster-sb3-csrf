import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceClassAndPagination } from '../entity-with-service-class-and-pagination.model';

@Component({
  selector: 'jhi-entity-with-service-class-and-pagination-detail',
  templateUrl: './entity-with-service-class-and-pagination-detail.component.html',
})
export class EntityWithServiceClassAndPaginationDetailComponent implements OnInit {
  entityWithServiceClassAndPagination: IEntityWithServiceClassAndPagination | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceClassAndPagination }) => {
      this.entityWithServiceClassAndPagination = entityWithServiceClassAndPagination;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
