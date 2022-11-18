import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntityWithPaginationAndDTOService } from '../service/entity-with-pagination-and-dto.service';

import { EntityWithPaginationAndDTOComponent } from './entity-with-pagination-and-dto.component';
import SpyInstance = jest.SpyInstance;

describe('EntityWithPaginationAndDTO Management Component', () => {
  let comp: EntityWithPaginationAndDTOComponent;
  let fixture: ComponentFixture<EntityWithPaginationAndDTOComponent>;
  let service: EntityWithPaginationAndDTOService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'entity-with-pagination-and-dto', component: EntityWithPaginationAndDTOComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [EntityWithPaginationAndDTOComponent],
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
      .overrideTemplate(EntityWithPaginationAndDTOComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithPaginationAndDTOComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithPaginationAndDTOService);
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
    expect(comp.entityWithPaginationAndDTOS?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to entityWithPaginationAndDTOService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getEntityWithPaginationAndDTOIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEntityWithPaginationAndDTOIdentifier).toHaveBeenCalledWith(entity);
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
