import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithPaginationAndDTO } from '../entity-with-pagination-and-dto.model';

@Component({
  selector: 'jhi-entity-with-pagination-and-dto-detail',
  templateUrl: './entity-with-pagination-and-dto-detail.component.html',
})
export class EntityWithPaginationAndDTODetailComponent implements OnInit {
  entityWithPaginationAndDTO: IEntityWithPaginationAndDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithPaginationAndDTO }) => {
      this.entityWithPaginationAndDTO = entityWithPaginationAndDTO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
