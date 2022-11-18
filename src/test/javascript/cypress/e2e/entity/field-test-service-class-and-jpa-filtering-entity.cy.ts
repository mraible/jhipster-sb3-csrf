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

describe('FieldTestServiceClassAndJpaFilteringEntity e2e test', () => {
  const fieldTestServiceClassAndJpaFilteringEntityPageUrl = '/field-test-service-class-and-jpa-filtering-entity';
  const fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern = new RegExp(
    '/field-test-service-class-and-jpa-filtering-entity(\\?.*)?$'
  );
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fieldTestServiceClassAndJpaFilteringEntitySample = {
    stringRequiredBob: 'zero Bicycle',
    integerRequiredBob: 76319,
    longRequiredBob: 78790,
    floatRequiredBob: 18552,
    doubleRequiredBob: 55200,
    bigDecimalRequiredBob: 38002,
    localDateRequiredBob: '2016-02-08',
    instanteRequiredBob: '2016-02-07T20:35:15.089Z',
    zonedDateTimeRequiredBob: '2016-02-08T12:47:42.270Z',
    durationRequiredBob: 33483,
    booleanRequiredBob: false,
    enumRequiredBob: 'ENUM_VALUE_1',
    uuidRequiredBob: '2b47f893-8b79-408b-ba42-0fb9f283b30e',
    byteImageRequiredBob: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteImageRequiredBobContentType: 'unknown',
    byteAnyRequiredBob: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteAnyRequiredBobContentType: 'unknown',
    byteTextRequiredBob: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
  };

  let fieldTestServiceClassAndJpaFilteringEntity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/field-test-service-class-and-jpa-filtering-entities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/field-test-service-class-and-jpa-filtering-entities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/field-test-service-class-and-jpa-filtering-entities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fieldTestServiceClassAndJpaFilteringEntity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/field-test-service-class-and-jpa-filtering-entities/${fieldTestServiceClassAndJpaFilteringEntity.id}`,
      }).then(() => {
        fieldTestServiceClassAndJpaFilteringEntity = undefined;
      });
    }
  });

  it('FieldTestServiceClassAndJpaFilteringEntities menu should load FieldTestServiceClassAndJpaFilteringEntities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('field-test-service-class-and-jpa-filtering-entity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FieldTestServiceClassAndJpaFilteringEntity').should('exist');
    cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);
  });

  describe('FieldTestServiceClassAndJpaFilteringEntity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fieldTestServiceClassAndJpaFilteringEntityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FieldTestServiceClassAndJpaFilteringEntity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/field-test-service-class-and-jpa-filtering-entity/new$'));
        cy.getEntityCreateUpdateHeading('FieldTestServiceClassAndJpaFilteringEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/field-test-service-class-and-jpa-filtering-entities',
          body: fieldTestServiceClassAndJpaFilteringEntitySample,
        }).then(({ body }) => {
          fieldTestServiceClassAndJpaFilteringEntity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/field-test-service-class-and-jpa-filtering-entities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [fieldTestServiceClassAndJpaFilteringEntity],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fieldTestServiceClassAndJpaFilteringEntityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FieldTestServiceClassAndJpaFilteringEntity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fieldTestServiceClassAndJpaFilteringEntity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestServiceClassAndJpaFilteringEntity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestServiceClassAndJpaFilteringEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestServiceClassAndJpaFilteringEntity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestServiceClassAndJpaFilteringEntity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);
      });

      it('last delete button click should delete instance of FieldTestServiceClassAndJpaFilteringEntity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fieldTestServiceClassAndJpaFilteringEntity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);

        fieldTestServiceClassAndJpaFilteringEntity = undefined;
      });
    });
  });

  describe('new FieldTestServiceClassAndJpaFilteringEntity page', () => {
    beforeEach(() => {
      cy.visit(`${fieldTestServiceClassAndJpaFilteringEntityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FieldTestServiceClassAndJpaFilteringEntity');
    });

    it('should create an instance of FieldTestServiceClassAndJpaFilteringEntity', () => {
      cy.get(`[data-cy="stringBob"]`).type('architecto').should('have.value', 'architecto');

      cy.get(`[data-cy="stringRequiredBob"]`).type('Diesel Northeast Paradigm').should('have.value', 'Diesel Northeast Paradigm');

      cy.get(`[data-cy="stringMinlengthBob"]`).type('Associate').should('have.value', 'Associate');

      cy.get(`[data-cy="stringMaxlengthBob"]`).type('THX purple bypass').should('have.value', 'THX purple bypass');

      cy.get(`[data-cy="stringPatternBob"]`).type('fkAR').should('have.value', 'fkAR');

      cy.get(`[data-cy="integerBob"]`).type('33235').should('have.value', '33235');

      cy.get(`[data-cy="integerRequiredBob"]`).type('92512').should('have.value', '92512');

      cy.get(`[data-cy="integerMinBob"]`).type('20202').should('have.value', '20202');

      cy.get(`[data-cy="integerMaxBob"]`).type('62').should('have.value', '62');

      cy.get(`[data-cy="longBob"]`).type('10148').should('have.value', '10148');

      cy.get(`[data-cy="longRequiredBob"]`).type('24452').should('have.value', '24452');

      cy.get(`[data-cy="longMinBob"]`).type('4789').should('have.value', '4789');

      cy.get(`[data-cy="longMaxBob"]`).type('35').should('have.value', '35');

      cy.get(`[data-cy="floatBob"]`).type('54661').should('have.value', '54661');

      cy.get(`[data-cy="floatRequiredBob"]`).type('42044').should('have.value', '42044');

      cy.get(`[data-cy="floatMinBob"]`).type('62180').should('have.value', '62180');

      cy.get(`[data-cy="floatMaxBob"]`).type('22').should('have.value', '22');

      cy.get(`[data-cy="doubleRequiredBob"]`).type('22481').should('have.value', '22481');

      cy.get(`[data-cy="doubleMinBob"]`).type('7209').should('have.value', '7209');

      cy.get(`[data-cy="doubleMaxBob"]`).type('3').should('have.value', '3');

      cy.get(`[data-cy="bigDecimalRequiredBob"]`).type('76396').should('have.value', '76396');

      cy.get(`[data-cy="bigDecimalMinBob"]`).type('48819').should('have.value', '48819');

      cy.get(`[data-cy="bigDecimalMaxBob"]`).type('31').should('have.value', '31');

      cy.get(`[data-cy="localDateBob"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="localDateRequiredBob"]`).type('2016-02-07').blur().should('have.value', '2016-02-07');

      cy.get(`[data-cy="instantBob"]`).type('2016-02-08T16:48').blur().should('have.value', '2016-02-08T16:48');

      cy.get(`[data-cy="instanteRequiredBob"]`).type('2016-02-07T20:05').blur().should('have.value', '2016-02-07T20:05');

      cy.get(`[data-cy="zonedDateTimeBob"]`).type('2016-02-08T03:17').blur().should('have.value', '2016-02-08T03:17');

      cy.get(`[data-cy="zonedDateTimeRequiredBob"]`).type('2016-02-08T17:07').blur().should('have.value', '2016-02-08T17:07');

      cy.get(`[data-cy="durationBob"]`).type('PT14M').blur().should('have.value', 'PT14M');

      cy.get(`[data-cy="durationRequiredBob"]`).type('PT46M').blur().should('have.value', 'PT46M');

      cy.get(`[data-cy="booleanBob"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanBob"]`).click().should('be.checked');

      cy.get(`[data-cy="booleanRequiredBob"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanRequiredBob"]`).click().should('be.checked');

      cy.get(`[data-cy="enumBob"]`).select('ENUM_VALUE_1');

      cy.get(`[data-cy="enumRequiredBob"]`).select('ENUM_VALUE_1');

      cy.get(`[data-cy="uuidBob"]`)
        .type('24e0ccd3-4b8c-49c3-ad3c-28afbcc88c3f')
        .invoke('val')
        .should('match', new RegExp('24e0ccd3-4b8c-49c3-ad3c-28afbcc88c3f'));

      cy.get(`[data-cy="uuidRequiredBob"]`)
        .type('345602f7-1918-45af-a044-bcd4c6376abc')
        .invoke('val')
        .should('match', new RegExp('345602f7-1918-45af-a044-bcd4c6376abc'));

      cy.setFieldImageAsBytesOfEntity('byteImageBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageRequiredBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMinbytesBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMaxbytesBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyRequiredBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMinbytesBob', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMaxbytesBob', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="byteTextBob"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="byteTextRequiredBob"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fieldTestServiceClassAndJpaFilteringEntity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fieldTestServiceClassAndJpaFilteringEntityPageUrlPattern);
    });
  });
});
