import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('EntityWithServiceImplAndPagination e2e test', () => {
  const entityWithServiceImplAndPaginationPageUrl = '/entity-with-service-impl-and-pagination';
  const entityWithServiceImplAndPaginationPageUrlPattern = new RegExp('/entity-with-service-impl-and-pagination(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const entityWithServiceImplAndPaginationSample = {};

  let entityWithServiceImplAndPagination;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/entity-with-service-impl-and-paginations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/entity-with-service-impl-and-paginations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/entity-with-service-impl-and-paginations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (entityWithServiceImplAndPagination) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/entity-with-service-impl-and-paginations/${entityWithServiceImplAndPagination.id}`,
      }).then(() => {
        entityWithServiceImplAndPagination = undefined;
      });
    }
  });

  it('EntityWithServiceImplAndPaginations menu should load EntityWithServiceImplAndPaginations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('entity-with-service-impl-and-pagination');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('EntityWithServiceImplAndPagination').should('exist');
    cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);
  });

  describe('EntityWithServiceImplAndPagination page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(entityWithServiceImplAndPaginationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create EntityWithServiceImplAndPagination page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/entity-with-service-impl-and-pagination/new$'));
        cy.getEntityCreateUpdateHeading('EntityWithServiceImplAndPagination');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/entity-with-service-impl-and-paginations',
          body: entityWithServiceImplAndPaginationSample,
        }).then(({ body }) => {
          entityWithServiceImplAndPagination = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/entity-with-service-impl-and-paginations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/entity-with-service-impl-and-paginations?page=0&size=20>; rel="last",<http://localhost/api/entity-with-service-impl-and-paginations?page=0&size=20>; rel="first"',
              },
              body: [entityWithServiceImplAndPagination],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(entityWithServiceImplAndPaginationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details EntityWithServiceImplAndPagination page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('entityWithServiceImplAndPagination');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);
      });

      it('edit button click should load edit EntityWithServiceImplAndPagination page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntityWithServiceImplAndPagination');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);
      });

      it('edit button click should load edit EntityWithServiceImplAndPagination page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('EntityWithServiceImplAndPagination');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);
      });

      it('last delete button click should delete instance of EntityWithServiceImplAndPagination', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('entityWithServiceImplAndPagination').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);

        entityWithServiceImplAndPagination = undefined;
      });
    });
  });

  describe('new EntityWithServiceImplAndPagination page', () => {
    beforeEach(() => {
      cy.visit(`${entityWithServiceImplAndPaginationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('EntityWithServiceImplAndPagination');
    });

    it('should create an instance of EntityWithServiceImplAndPagination', () => {
      cy.get(`[data-cy="hugo"]`).type('tan Southwest').should('have.value', 'tan Southwest');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        entityWithServiceImplAndPagination = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', entityWithServiceImplAndPaginationPageUrlPattern);
    });
  });
});
