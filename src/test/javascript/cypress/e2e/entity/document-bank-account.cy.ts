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

describe('DocumentBankAccount e2e test', () => {
  const documentBankAccountPageUrl = '/document-bank-account';
  const documentBankAccountPageUrlPattern = new RegExp('/document-bank-account(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const documentBankAccountSample = { name: 'blue Wooden deposit', balance: 92792 };

  let documentBankAccount;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/document-bank-accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/document-bank-accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/document-bank-accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (documentBankAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/document-bank-accounts/${documentBankAccount.id}`,
      }).then(() => {
        documentBankAccount = undefined;
      });
    }
  });

  it('DocumentBankAccounts menu should load DocumentBankAccounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('document-bank-account');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('DocumentBankAccount').should('exist');
    cy.url().should('match', documentBankAccountPageUrlPattern);
  });

  describe('DocumentBankAccount page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(documentBankAccountPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create DocumentBankAccount page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/document-bank-account/new$'));
        cy.getEntityCreateUpdateHeading('DocumentBankAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', documentBankAccountPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/document-bank-accounts',
          body: documentBankAccountSample,
        }).then(({ body }) => {
          documentBankAccount = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/document-bank-accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [documentBankAccount],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(documentBankAccountPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details DocumentBankAccount page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('documentBankAccount');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', documentBankAccountPageUrlPattern);
      });

      it('edit button click should load edit DocumentBankAccount page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DocumentBankAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', documentBankAccountPageUrlPattern);
      });

      it('edit button click should load edit DocumentBankAccount page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('DocumentBankAccount');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', documentBankAccountPageUrlPattern);
      });

      it('last delete button click should delete instance of DocumentBankAccount', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('documentBankAccount').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', documentBankAccountPageUrlPattern);

        documentBankAccount = undefined;
      });
    });
  });

  describe('new DocumentBankAccount page', () => {
    beforeEach(() => {
      cy.visit(`${documentBankAccountPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('DocumentBankAccount');
    });

    it('should create an instance of DocumentBankAccount', () => {
      cy.get(`[data-cy="name"]`).type('Crew navigate').should('have.value', 'Crew navigate');

      cy.get(`[data-cy="bankNumber"]`).type('28440').should('have.value', '28440');

      cy.get(`[data-cy="agencyNumber"]`).type('87619').should('have.value', '87619');

      cy.get(`[data-cy="lastOperationDuration"]`).type('25083').should('have.value', '25083');

      cy.get(`[data-cy="meanOperationDuration"]`).type('80037').should('have.value', '80037');

      cy.get(`[data-cy="balance"]`).type('46952').should('have.value', '46952');

      cy.get(`[data-cy="openingDay"]`).type('2015-08-05').blur().should('have.value', '2015-08-05');

      cy.get(`[data-cy="lastOperationDate"]`).type('2015-08-05T10:55').blur().should('have.value', '2015-08-05T10:55');

      cy.get(`[data-cy="active"]`).should('not.be.checked');
      cy.get(`[data-cy="active"]`).click().should('be.checked');

      cy.get(`[data-cy="accountType"]`).select('SAVINGS');

      cy.setFieldImageAsBytesOfEntity('attachment', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="description"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        documentBankAccount = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', documentBankAccountPageUrlPattern);
    });
  });
});
