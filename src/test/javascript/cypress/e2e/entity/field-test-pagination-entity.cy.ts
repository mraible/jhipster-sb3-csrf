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

describe('FieldTestPaginationEntity e2e test', () => {
  const fieldTestPaginationEntityPageUrl = '/field-test-pagination-entity';
  const fieldTestPaginationEntityPageUrlPattern = new RegExp('/field-test-pagination-entity(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fieldTestPaginationEntitySample = {
    stringRequiredAlice: 'tan Hat South',
    integerRequiredAlice: 85798,
    longRequiredAlice: 89577,
    floatRequiredAlice: 94624,
    doubleRequiredAlice: 11275,
    bigDecimalRequiredAlice: 9223,
    localDateRequiredAlice: '2016-02-08',
    instanteRequiredAlice: '2016-02-08T16:17:19.274Z',
    zonedDateTimeRequiredAlice: '2016-02-07T19:31:42.185Z',
    durationRequiredAlice: 97388,
    booleanRequiredAlice: false,
    enumRequiredAlice: 'ENUM_VALUE_3',
    uuidRequiredAlice: '55d59fe4-0963-4177-b15d-ecc8c0f734c2',
    byteImageRequiredAlice: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteImageRequiredAliceContentType: 'unknown',
    byteAnyRequiredAlice: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteAnyRequiredAliceContentType: 'unknown',
    byteTextRequiredAlice: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
  };

  let fieldTestPaginationEntity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/field-test-pagination-entities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/field-test-pagination-entities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/field-test-pagination-entities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fieldTestPaginationEntity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/field-test-pagination-entities/${fieldTestPaginationEntity.id}`,
      }).then(() => {
        fieldTestPaginationEntity = undefined;
      });
    }
  });

  it('FieldTestPaginationEntities menu should load FieldTestPaginationEntities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('field-test-pagination-entity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FieldTestPaginationEntity').should('exist');
    cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);
  });

  describe('FieldTestPaginationEntity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fieldTestPaginationEntityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FieldTestPaginationEntity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/field-test-pagination-entity/new$'));
        cy.getEntityCreateUpdateHeading('FieldTestPaginationEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/field-test-pagination-entities',
          body: fieldTestPaginationEntitySample,
        }).then(({ body }) => {
          fieldTestPaginationEntity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/field-test-pagination-entities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/field-test-pagination-entities?page=0&size=20>; rel="last",<http://localhost/api/field-test-pagination-entities?page=0&size=20>; rel="first"',
              },
              body: [fieldTestPaginationEntity],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fieldTestPaginationEntityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FieldTestPaginationEntity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fieldTestPaginationEntity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestPaginationEntity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestPaginationEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestPaginationEntity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestPaginationEntity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);
      });

      it('last delete button click should delete instance of FieldTestPaginationEntity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fieldTestPaginationEntity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);

        fieldTestPaginationEntity = undefined;
      });
    });
  });

  describe('new FieldTestPaginationEntity page', () => {
    beforeEach(() => {
      cy.visit(`${fieldTestPaginationEntityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FieldTestPaginationEntity');
    });

    it('should create an instance of FieldTestPaginationEntity', () => {
      cy.get(`[data-cy="stringAlice"]`).type('Qatar Savings Northeast').should('have.value', 'Qatar Savings Northeast');

      cy.get(`[data-cy="stringRequiredAlice"]`).type('wireless').should('have.value', 'wireless');

      cy.get(`[data-cy="stringMinlengthAlice"]`)
        .type('Transmasculine Norway Uzbekistan')
        .should('have.value', 'Transmasculine Norway Uzbekistan');

      cy.get(`[data-cy="stringMaxlengthAlice"]`).type('Customer withdrawal ').should('have.value', 'Customer withdrawal ');

      cy.get(`[data-cy="stringPatternAlice"]`).type('Rq').should('have.value', 'Rq');

      cy.get(`[data-cy="integerAlice"]`).type('85959').should('have.value', '85959');

      cy.get(`[data-cy="integerRequiredAlice"]`).type('74805').should('have.value', '74805');

      cy.get(`[data-cy="integerMinAlice"]`).type('3394').should('have.value', '3394');

      cy.get(`[data-cy="integerMaxAlice"]`).type('86').should('have.value', '86');

      cy.get(`[data-cy="longAlice"]`).type('11092').should('have.value', '11092');

      cy.get(`[data-cy="longRequiredAlice"]`).type('80040').should('have.value', '80040');

      cy.get(`[data-cy="longMinAlice"]`).type('60320').should('have.value', '60320');

      cy.get(`[data-cy="longMaxAlice"]`).type('25').should('have.value', '25');

      cy.get(`[data-cy="floatAlice"]`).type('25958').should('have.value', '25958');

      cy.get(`[data-cy="floatRequiredAlice"]`).type('79270').should('have.value', '79270');

      cy.get(`[data-cy="floatMinAlice"]`).type('3644').should('have.value', '3644');

      cy.get(`[data-cy="floatMaxAlice"]`).type('69').should('have.value', '69');

      cy.get(`[data-cy="doubleRequiredAlice"]`).type('57525').should('have.value', '57525');

      cy.get(`[data-cy="doubleMinAlice"]`).type('18994').should('have.value', '18994');

      cy.get(`[data-cy="doubleMaxAlice"]`).type('7').should('have.value', '7');

      cy.get(`[data-cy="bigDecimalRequiredAlice"]`).type('65346').should('have.value', '65346');

      cy.get(`[data-cy="bigDecimalMinAlice"]`).type('83206').should('have.value', '83206');

      cy.get(`[data-cy="bigDecimalMaxAlice"]`).type('76').should('have.value', '76');

      cy.get(`[data-cy="localDateAlice"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="localDateRequiredAlice"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="instantAlice"]`).type('2016-02-08T02:32').blur().should('have.value', '2016-02-08T02:32');

      cy.get(`[data-cy="instanteRequiredAlice"]`).type('2016-02-07T21:44').blur().should('have.value', '2016-02-07T21:44');

      cy.get(`[data-cy="zonedDateTimeAlice"]`).type('2016-02-08T05:29').blur().should('have.value', '2016-02-08T05:29');

      cy.get(`[data-cy="zonedDateTimeRequiredAlice"]`).type('2016-02-08T13:25').blur().should('have.value', '2016-02-08T13:25');

      cy.get(`[data-cy="durationAlice"]`).type('PT34M').blur().should('have.value', 'PT34M');

      cy.get(`[data-cy="durationRequiredAlice"]`).type('PT13M').blur().should('have.value', 'PT13M');

      cy.get(`[data-cy="booleanAlice"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanAlice"]`).click().should('be.checked');

      cy.get(`[data-cy="booleanRequiredAlice"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanRequiredAlice"]`).click().should('be.checked');

      cy.get(`[data-cy="enumAlice"]`).select('ENUM_VALUE_3');

      cy.get(`[data-cy="enumRequiredAlice"]`).select('ENUM_VALUE_1');

      cy.get(`[data-cy="uuidAlice"]`)
        .type('d0de1052-6830-48d0-9850-9e149b11a43d')
        .invoke('val')
        .should('match', new RegExp('d0de1052-6830-48d0-9850-9e149b11a43d'));

      cy.get(`[data-cy="uuidRequiredAlice"]`)
        .type('17fa7715-77ae-40f8-b8df-d0357b63105f')
        .invoke('val')
        .should('match', new RegExp('17fa7715-77ae-40f8-b8df-d0357b63105f'));

      cy.setFieldImageAsBytesOfEntity('byteImageAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageRequiredAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMinbytesAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMaxbytesAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyRequiredAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMinbytesAlice', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMaxbytesAlice', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="byteTextAlice"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="byteTextRequiredAlice"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fieldTestPaginationEntity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fieldTestPaginationEntityPageUrlPattern);
    });
  });
});
