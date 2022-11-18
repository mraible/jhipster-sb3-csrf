import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithServiceImplAndDTO } from '../entity-with-service-impl-and-dto.model';

@Component({
  selector: 'jhi-entity-with-service-impl-and-dto-detail',
  templateUrl: './entity-with-service-impl-and-dto-detail.component.html',
})
export class EntityWithServiceImplAndDTODetailComponent implements OnInit {
  entityWithServiceImplAndDTO: IEntityWithServiceImplAndDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithServiceImplAndDTO }) => {
      this.entityWithServiceImplAndDTO = entityWithServiceImplAndDTO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
