import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntityWithDTO } from '../entity-with-dto.model';

@Component({
  selector: 'jhi-entity-with-dto-detail',
  templateUrl: './entity-with-dto-detail.component.html',
})
export class EntityWithDTODetailComponent implements OnInit {
  entityWithDTO: IEntityWithDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entityWithDTO }) => {
      this.entityWithDTO = entityWithDTO;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
