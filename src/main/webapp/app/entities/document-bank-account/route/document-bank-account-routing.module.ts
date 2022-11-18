import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DocumentBankAccountComponent } from '../list/document-bank-account.component';
import { DocumentBankAccountDetailComponent } from '../detail/document-bank-account-detail.component';
import { DocumentBankAccountUpdateComponent } from '../update/document-bank-account-update.component';
import { DocumentBankAccountRoutingResolveService } from './document-bank-account-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const documentBankAccountRoute: Routes = [
  {
    path: '',
    component: DocumentBankAccountComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentBankAccountDetailComponent,
    resolve: {
      documentBankAccount: DocumentBankAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentBankAccountUpdateComponent,
    resolve: {
      documentBankAccount: DocumentBankAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentBankAccountUpdateComponent,
    resolve: {
      documentBankAccount: DocumentBankAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(documentBankAccountRoute)],
  exports: [RouterModule],
})
export class DocumentBankAccountRoutingModule {}
