import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntityWithDTOService } from '../service/entity-with-dto.service';

import { EntityWithDTOComponent } from './entity-with-dto.component';

describe('EntityWithDTO Management Component', () => {
  let comp: EntityWithDTOComponent;
  let fixture: ComponentFixture<EntityWithDTOComponent>;
  let service: EntityWithDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'entity-with-dto', component: EntityWithDTOComponent }]), HttpClientTestingModule],
      declarations: [EntityWithDTOComponent],
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
      .overrideTemplate(EntityWithDTOComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntityWithDTOComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithDTOService);

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
    expect(comp.entityWithDTOS?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to entityWithDTOService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getEntityWithDTOIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEntityWithDTOIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
