import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityWithServiceImplAndDTODetailComponent } from './entity-with-service-impl-and-dto-detail.component';

describe('EntityWithServiceImplAndDTO Management Detail Component', () => {
  let comp: EntityWithServiceImplAndDTODetailComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndDTODetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityWithServiceImplAndDTODetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entityWithServiceImplAndDTO: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(EntityWithServiceImplAndDTODetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithServiceImplAndDTODetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entityWithServiceImplAndDTO on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entityWithServiceImplAndDTO).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
