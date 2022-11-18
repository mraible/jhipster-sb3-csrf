import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FieldTestServiceClassAndJpaFilteringEntityService } from '../service/field-test-service-class-and-jpa-filtering-entity.service';

import { FieldTestServiceClassAndJpaFilteringEntityComponent } from './field-test-service-class-and-jpa-filtering-entity.component';

describe('FieldTestServiceClassAndJpaFilteringEntity Management Component', () => {
  let comp: FieldTestServiceClassAndJpaFilteringEntityComponent;
  let fixture: ComponentFixture<FieldTestServiceClassAndJpaFilteringEntityComponent>;
  let service: FieldTestServiceClassAndJpaFilteringEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'field-test-service-class-and-jpa-filtering-entity', component: FieldTestServiceClassAndJpaFilteringEntityComponent },
        ]),
        HttpClientTestingModule,
      ],
      declarations: [FieldTestServiceClassAndJpaFilteringEntityComponent],
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
      .overrideTemplate(FieldTestServiceClassAndJpaFilteringEntityComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FieldTestServiceClassAndJpaFilteringEntityComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FieldTestServiceClassAndJpaFilteringEntityService);

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
    expect(comp.fieldTestServiceClassAndJpaFilteringEntities?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to fieldTestServiceClassAndJpaFilteringEntityService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getFieldTestServiceClassAndJpaFilteringEntityIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFieldTestServiceClassAndJpaFilteringEntityIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
