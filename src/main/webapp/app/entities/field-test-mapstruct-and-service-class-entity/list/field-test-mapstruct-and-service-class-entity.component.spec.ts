import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FieldTestMapstructAndServiceClassEntityService } from '../service/field-test-mapstruct-and-service-class-entity.service';

import { FieldTestMapstructAndServiceClassEntityComponent } from './field-test-mapstruct-and-service-class-entity.component';

describe('FieldTestMapstructAndServiceClassEntity Management Component', () => {
  let comp: FieldTestMapstructAndServiceClassEntityComponent;
  let fixture: ComponentFixture<FieldTestMapstructAndServiceClassEntityComponent>;
  let service: FieldTestMapstructAndServiceClassEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'field-test-mapstruct-and-service-class-entity', component: FieldTestMapstructAndServiceClassEntityComponent },
        ]),
        HttpClientTestingModule,
      ],
      declarations: [FieldTestMapstructAndServiceClassEntityComponent],
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
      .overrideTemplate(FieldTestMapstructAndServiceClassEntityComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestMapstructAndServiceClassEntityComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FieldTestMapstructAndServiceClassEntityService);

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
    expect(comp.fieldTestMapstructAndServiceClassEntities?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to fieldTestMapstructAndServiceClassEntityService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getFieldTestMapstructAndServiceClassEntityIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFieldTestMapstructAndServiceClassEntityIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
