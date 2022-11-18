jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityWithServiceImplAndPaginationService } from '../service/entity-with-service-impl-and-pagination.service';

import { EntityWithServiceImplAndPaginationDeleteDialogComponent } from './entity-with-service-impl-and-pagination-delete-dialog.component';

describe('EntityWithServiceImplAndPagination Management Delete Component', () => {
  let comp: EntityWithServiceImplAndPaginationDeleteDialogComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndPaginationDeleteDialogComponent>;
  let service: EntityWithServiceImplAndPaginationService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EntityWithServiceImplAndPaginationDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EntityWithServiceImplAndPaginationDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithServiceImplAndPaginationService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete('ABC');
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith('ABC');
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
