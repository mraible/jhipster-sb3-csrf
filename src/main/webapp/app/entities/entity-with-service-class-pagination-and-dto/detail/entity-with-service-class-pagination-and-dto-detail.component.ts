import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceClassPaginationAndDTO } from '../entity-with-service-class-pagination-and-dto.model';

@Component({
  selector: 'jhi-entity-with-service-class-pagination-and-dto-detail',
  templateUrl: './entity-with-service-class-pagination-and-dto-detail.component.html',
})
export class EntityWithServiceClassPaginationAndDTODetailComponent implements OnInit {
  entityWithServiceClassPaginationAndDTO: IEntityWithServiceClassPaginationAndDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceClassPaginationAndDTO }) => {
      this.entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
