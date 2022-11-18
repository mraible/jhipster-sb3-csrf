import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'document-bank-account',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.documentBankAccount.home.title' },
        loadChildren: () => import('./document-bank-account/document-bank-account.module').then(m => m.DocumentBankAccountModule),
      },
      {
        path: 'field-test-entity',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.fieldTestEntity.home.title' },
        loadChildren: () => import('./field-test-entity/field-test-entity.module').then(m => m.FieldTestEntityModule),
      },
      {
        path: 'field-test-infinite-scroll-entity',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.fieldTestInfiniteScrollEntity.home.title' },
        loadChildren: () =>
          import('./field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.module').then(
            m => m.FieldTestInfiniteScrollEntityModule
          ),
      },
      {
        path: 'field-test-mapstruct-and-service-class-entity',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.fieldTestMapstructAndServiceClassEntity.home.title' },
        loadChildren: () =>
          import('./field-test-mapstruct-and-service-class-entity/field-test-mapstruct-and-service-class-entity.module').then(
            m => m.FieldTestMapstructAndServiceClassEntityModule
          ),
      },
      {
        path: 'field-test-pagination-entity',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.fieldTestPaginationEntity.home.title' },
        loadChildren: () =>
          import('./field-test-pagination-entity/field-test-pagination-entity.module').then(m => m.FieldTestPaginationEntityModule),
      },
      {
        path: 'field-test-service-class-and-jpa-filtering-entity',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.fieldTestServiceClassAndJpaFilteringEntity.home.title' },
        loadChildren: () =>
          import('./field-test-service-class-and-jpa-filtering-entity/field-test-service-class-and-jpa-filtering-entity.module').then(
            m => m.FieldTestServiceClassAndJpaFilteringEntityModule
          ),
      },
      {
        path: 'field-test-service-impl-entity',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.fieldTestServiceImplEntity.home.title' },
        loadChildren: () =>
          import('./field-test-service-impl-entity/field-test-service-impl-entity.module').then(m => m.FieldTestServiceImplEntityModule),
      },
      {
        path: 'entity-with-dto',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithDTO.home.title' },
        loadChildren: () => import('./entity-with-dto/entity-with-dto.module').then(m => m.EntityWithDTOModule),
      },
      {
        path: 'entity-with-service-class-and-pagination',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithServiceClassAndPagination.home.title' },
        loadChildren: () =>
          import('./entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.module').then(
            m => m.EntityWithServiceClassAndPaginationModule
          ),
      },
      {
        path: 'entity-with-service-impl-and-pagination',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithServiceImplAndPagination.home.title' },
        loadChildren: () =>
          import('./entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.module').then(
            m => m.EntityWithServiceImplAndPaginationModule
          ),
      },
      {
        path: 'entity-with-service-impl-and-dto',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithServiceImplAndDTO.home.title' },
        loadChildren: () =>
          import('./entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.module').then(
            m => m.EntityWithServiceImplAndDTOModule
          ),
      },
      {
        path: 'entity-with-pagination-and-dto',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithPaginationAndDTO.home.title' },
        loadChildren: () =>
          import('./entity-with-pagination-and-dto/entity-with-pagination-and-dto.module').then(m => m.EntityWithPaginationAndDTOModule),
      },
      {
        path: 'entity-with-service-class-pagination-and-dto',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithServiceClassPaginationAndDTO.home.title' },
        loadChildren: () =>
          import('./entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.module').then(
            m => m.EntityWithServiceClassPaginationAndDTOModule
          ),
      },
      {
        path: 'entity-with-service-impl-pagination-and-dto',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.entityWithServiceImplPaginationAndDTO.home.title' },
        loadChildren: () =>
          import('./entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.module').then(
            m => m.EntityWithServiceImplPaginationAndDTOModule
          ),
      },
      {
        path: 'division',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.testRootDivision.home.title' },
        loadChildren: () => import('./test-root/division/division.module').then(m => m.DivisionModule),
      },
      {
        path: 'place',
        data: { pageTitle: 'sampleWebfluxMongodbOauth2App.testRootPlace.home.title' },
        loadChildren: () => import('./test-root/place/place.module').then(m => m.PlaceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
