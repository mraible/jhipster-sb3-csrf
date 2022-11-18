import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntityWithServiceImplAndPaginationService } from '../service/entity-with-service-impl-and-pagination.service';

import { EntityWithServiceImplAndPaginationComponent } from './entity-with-service-impl-and-pagination.component';
import SpyInstance = jest.SpyInstance;

describe('EntityWithServiceImplAndPagination Management Component', () => {
  let comp: EntityWithServiceImplAndPaginationComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndPaginationComponent>;
  let service: EntityWithServiceImplAndPaginationService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'entity-with-service-impl-and-pagination', component: EntityWithServiceImplAndPaginationComponent },
        ]),
        HttpClientTestingModule,
      ],
      declarations: [EntityWithServiceImplAndPaginationComponent],
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
      .overrideTemplate(EntityWithServiceImplAndPaginationComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithServiceImplAndPaginationService);
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
    expect(comp.entityWithServiceImplAndPaginations?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to entityWithServiceImplAndPaginationService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getEntityWithServiceImplAndPaginationIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEntityWithServiceImplAndPaginationIdentifier).toHaveBeenCalledWith(entity);
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
