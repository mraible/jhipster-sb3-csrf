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

describe('Division e2e test', () => {
  const divisionPageUrl = '/division';
  const divisionPageUrlPattern = new RegExp('/division(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const divisionSample = { name: 'port Investment', divisionType: 'SCHOOL' };

  let division;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/divisions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/divisions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/divisions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (division) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/divisions/${division.id}`,
      }).then(() => {
        division = undefined;
      });
    }
  });

  it('Divisions menu should load Divisions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Division').should('exist');
    cy.url().should('match', divisionPageUrlPattern);
  });

  describe('Division page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(divisionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Division page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/division/new$'));
        cy.getEntityCreateUpdateHeading('Division');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', divisionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/divisions',
          body: divisionSample,
        }).then(({ body }) => {
          division = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/divisions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [division],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(divisionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Division page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('division');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', divisionPageUrlPattern);
      });

      it('edit button click should load edit Division page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Division');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', divisionPageUrlPattern);
      });

      it('edit button click should load edit Division page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Division');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', divisionPageUrlPattern);
      });

      it('last delete button click should delete instance of Division', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('division').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', divisionPageUrlPattern);

        division = undefined;
      });
    });
  });

  describe('new Division page', () => {
    beforeEach(() => {
      cy.visit(`${divisionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Division');
    });

    it('should create an instance of Division', () => {
      cy.get(`[data-cy="name"]`).type('Convertible').should('have.value', 'Convertible');

      cy.get(`[data-cy="shortName"]`).type('Islands, doloribus Chair').should('have.value', 'Islands, doloribus Chair');

      cy.get(`[data-cy="numberOfPeople"]`).type('44780').should('have.value', '44780');

      cy.get(`[data-cy="divisionType"]`).select('SCHOOL');

      cy.get(`[data-cy="colorBackground"]`).type('Polonium').should('have.value', 'Polonium');

      cy.get(`[data-cy="colorText"]`).type('Lutetium feint Director').should('have.value', 'Lutetium feint Director');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        division = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', divisionPageUrlPattern);
    });
  });
});
