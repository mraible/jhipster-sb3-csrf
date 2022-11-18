import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FieldTestEntityService } from '../service/field-test-entity.service';

import { FieldTestEntityComponent } from './field-test-entity.component';

describe('FieldTestEntity Management Component', () => {
  let comp: FieldTestEntityComponent;
  let fixture: ComponentFixture<FieldTestEntityComponent>;
  let service: FieldTestEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'field-test-entity', component: FieldTestEntityComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [FieldTestEntityComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(FieldTestEntityComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestEntityComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FieldTestEntityService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.fieldTestEntities?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to fieldTestEntityService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getFieldTestEntityIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFieldTestEntityIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
