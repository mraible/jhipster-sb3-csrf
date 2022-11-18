import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityWithDTODetailComponent } from './entity-with-dto-detail.component';

describe('EntityWithDTO Management Detail Component', () => {
  let comp: EntityWithDTODetailComponent;
  let fixture: ComponentFixture<EntityWithDTODetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityWithDTODetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entityWithDTO: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(EntityWithDTODetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithDTODetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entityWithDTO on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entityWithDTO).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
