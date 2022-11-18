import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityWithServiceClassPaginationAndDTODetailComponent } from './entity-with-service-class-pagination-and-dto-detail.component';

describe('EntityWithServiceClassPaginationAndDTO Management Detail Component', () => {
  let comp: EntityWithServiceClassPaginationAndDTODetailComponent;
  let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTODetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityWithServiceClassPaginationAndDTODetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entityWithServiceClassPaginationAndDTO: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(EntityWithServiceClassPaginationAndDTODetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTODetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entityWithServiceClassPaginationAndDTO on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entityWithServiceClassPaginationAndDTO).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
