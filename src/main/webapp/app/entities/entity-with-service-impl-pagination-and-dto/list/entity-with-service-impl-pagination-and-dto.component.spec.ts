import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntityWithServiceImplPaginationAndDTOService } from '../service/entity-with-service-impl-pagination-and-dto.service';

import { EntityWithServiceImplPaginationAndDTOComponent } from './entity-with-service-impl-pagination-and-dto.component';
import SpyInstance = jest.SpyInstance;

describe('EntityWithServiceImplPaginationAndDTO Management Component', () => {
  let comp: EntityWithServiceImplPaginationAndDTOComponent;
  let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTOComponent>;
  let service: EntityWithServiceImplPaginationAndDTOService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'entity-with-service-impl-pagination-and-dto', component: EntityWithServiceImplPaginationAndDTOComponent },
        ]),
        HttpClientTestingModule,
      ],
      declarations: [EntityWithServiceImplPaginationAndDTOComponent],
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
      .overrideTemplate(EntityWithServiceImplPaginationAndDTOComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTOComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithServiceImplPaginationAndDTOService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

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
    expect(comp.entityWithServiceImplPaginationAndDTOS?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to entityWithServiceImplPaginationAndDTOService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getEntityWithServiceImplPaginationAndDTOIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEntityWithServiceImplPaginationAndDTOIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });

  it('should load a page', () => {
    // WHEN
    comp.navigateToPage(1);

    // THEN
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.navigateToWithComponentValues();

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['name,asc'],
        }),
      })
    );
  });
});
