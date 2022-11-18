import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FieldTestServiceImplEntityService } from '../service/field-test-service-impl-entity.service';

import { FieldTestServiceImplEntityComponent } from './field-test-service-impl-entity.component';

describe('FieldTestServiceImplEntity Management Component', () => {
  let comp: FieldTestServiceImplEntityComponent;
  let fixture: ComponentFixture<FieldTestServiceImplEntityComponent>;
  let service: FieldTestServiceImplEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'field-test-service-impl-entity', component: FieldTestServiceImplEntityComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [FieldTestServiceImplEntityComponent],
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
      .overrideTemplate(FieldTestServiceImplEntityComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestServiceImplEntityComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FieldTestServiceImplEntityService);

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
    expect(comp.fieldTestServiceImplEntities?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to fieldTestServiceImplEntityService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getFieldTestServiceImplEntityIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFieldTestServiceImplEntityIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
