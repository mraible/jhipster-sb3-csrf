import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceImplPaginationAndDTO } from '../entity-with-service-impl-pagination-and-dto.model';

@Component({
  selector: 'jhi-entity-with-service-impl-pagination-and-dto-detail',
  templateUrl: './entity-with-service-impl-pagination-and-dto-detail.component.html',
})
export class EntityWithServiceImplPaginationAndDTODetailComponent implements OnInit {
  entityWithServiceImplPaginationAndDTO: IEntityWithServiceImplPaginationAndDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceImplPaginationAndDTO }) => {
      this.entityWithServiceImplPaginationAndDTO = entityWithServiceImplPaginationAndDTO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
