import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntityWithServiceImplAndDTOService } from '../service/entity-with-service-impl-and-dto.service';

import { EntityWithServiceImplAndDTOComponent } from './entity-with-service-impl-and-dto.component';

describe('EntityWithServiceImplAndDTO Management Component', () => {
  let comp: EntityWithServiceImplAndDTOComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndDTOComponent>;
  let service: EntityWithServiceImplAndDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'entity-with-service-impl-and-dto', component: EntityWithServiceImplAndDTOComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [EntityWithServiceImplAndDTOComponent],
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
      .overrideTemplate(EntityWithServiceImplAndDTOComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceImplAndDTOComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithServiceImplAndDTOService);

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
    expect(comp.entityWithServiceImplAndDTOS?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to entityWithServiceImplAndDTOService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getEntityWithServiceImplAndDTOIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEntityWithServiceImplAndDTOIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
