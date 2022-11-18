import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityWithServiceImplPaginationAndDTODetailComponent } from './entity-with-service-impl-pagination-and-dto-detail.component';

describe('EntityWithServiceImplPaginationAndDTO Management Detail Component', () => {
  let comp: EntityWithServiceImplPaginationAndDTODetailComponent;
  let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTODetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityWithServiceImplPaginationAndDTODetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entityWithServiceImplPaginationAndDTO: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(EntityWithServiceImplPaginationAndDTODetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTODetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entityWithServiceImplPaginationAndDTO on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entityWithServiceImplPaginationAndDTO).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
