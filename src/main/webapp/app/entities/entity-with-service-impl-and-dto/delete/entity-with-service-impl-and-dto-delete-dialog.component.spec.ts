jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityWithServiceImplAndDTOService } from '../service/entity-with-service-impl-and-dto.service';

import { EntityWithServiceImplAndDTODeleteDialogComponent } from './entity-with-service-impl-and-dto-delete-dialog.component';

describe('EntityWithServiceImplAndDTO Management Delete Component', () => {
  let comp: EntityWithServiceImplAndDTODeleteDialogComponent;
  let fixture: ComponentFixture<EntityWithServiceImplAndDTODeleteDialogComponent>;
  let service: EntityWithServiceImplAndDTOService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EntityWithServiceImplAndDTODeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EntityWithServiceImplAndDTODeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntityWithServiceImplAndDTODeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EntityWithServiceImplAndDTOService);
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
