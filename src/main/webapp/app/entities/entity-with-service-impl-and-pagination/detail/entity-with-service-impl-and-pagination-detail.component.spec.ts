import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityWithServiceImplAndPaginationDetailComponent } from './entity-with-service-impl-and-pagination-detail.component';

describe('EntityWithServiceImplAndPagination Management Detail Component', () => {
  let comp: EntityWithServiceImplAndPaginationDetailComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndPaginationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityWithServiceImplAndPaginationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entityWithServiceImplAndPagination: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(EntityWithServiceImplAndPaginationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entityWithServiceImplAndPagination on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entityWithServiceImplAndPagination).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
