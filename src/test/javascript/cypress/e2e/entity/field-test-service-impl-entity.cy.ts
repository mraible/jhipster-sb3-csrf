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

describe('FieldTestServiceImplEntity e2e test', () => {
  const fieldTestServiceImplEntityPageUrl = '/field-test-service-impl-entity';
  const fieldTestServiceImplEntityPageUrlPattern = new RegExp('/field-test-service-impl-entity(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fieldTestServiceImplEntitySample = {
    stringRequiredMika: 'towards',
    integerRequiredMika: 27376,
    longRequiredMika: 51838,
    floatRequiredMika: 1661,
    doubleRequiredMika: 67675,
    bigDecimalRequiredMika: 15563,
    localDateRequiredMika: '2016-02-08',
    instanteRequiredMika: '2016-02-07T23:05:30.796Z',
    zonedDateTimeRequiredMika: '2016-02-08T00:48:34.813Z',
    durationRequiredMika: 96608,
    booleanRequiredMika: false,
    enumRequiredMika: 'ENUM_VALUE_3',
    uuidRequiredMika: '343b53bc-f210-487c-b3b1-b5d24561085d',
    byteImageRequiredMika: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteImageRequiredMikaContentType: 'unknown',
    byteAnyRequiredMika: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteAnyRequiredMikaContentType: 'unknown',
    byteTextRequiredMika: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
  };

  let fieldTestServiceImplEntity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/field-test-service-impl-entities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/field-test-service-impl-entities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/field-test-service-impl-entities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fieldTestServiceImplEntity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/field-test-service-impl-entities/${fieldTestServiceImplEntity.id}`,
      }).then(() => {
        fieldTestServiceImplEntity = undefined;
      });
    }
  });

  it('FieldTestServiceImplEntities menu should load FieldTestServiceImplEntities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('field-test-service-impl-entity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FieldTestServiceImplEntity').should('exist');
    cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);
  });

  describe('FieldTestServiceImplEntity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fieldTestServiceImplEntityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FieldTestServiceImplEntity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/field-test-service-impl-entity/new$'));
        cy.getEntityCreateUpdateHeading('FieldTestServiceImplEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/field-test-service-impl-entities',
          body: fieldTestServiceImplEntitySample,
        }).then(({ body }) => {
          fieldTestServiceImplEntity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/field-test-service-impl-entities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [fieldTestServiceImplEntity],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fieldTestServiceImplEntityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FieldTestServiceImplEntity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fieldTestServiceImplEntity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestServiceImplEntity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestServiceImplEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestServiceImplEntity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestServiceImplEntity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);
      });

      it('last delete button click should delete instance of FieldTestServiceImplEntity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fieldTestServiceImplEntity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);

        fieldTestServiceImplEntity = undefined;
      });
    });
  });

  describe('new FieldTestServiceImplEntity page', () => {
    beforeEach(() => {
      cy.visit(`${fieldTestServiceImplEntityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FieldTestServiceImplEntity');
    });

    it('should create an instance of FieldTestServiceImplEntity', () => {
      cy.get(`[data-cy="stringMika"]`).type('AI').should('have.value', 'AI');

      cy.get(`[data-cy="stringRequiredMika"]`).type('Whittier Shirt').should('have.value', 'Whittier Shirt');

      cy.get(`[data-cy="stringMinlengthMika"]`).type('Checking').should('have.value', 'Checking');

      cy.get(`[data-cy="stringMaxlengthMika"]`).type('gah Electric').should('have.value', 'gah Electric');

      cy.get(`[data-cy="stringPatternMika"]`).type('JHq').should('have.value', 'JHq');

      cy.get(`[data-cy="integerMika"]`).type('43542').should('have.value', '43542');

      cy.get(`[data-cy="integerRequiredMika"]`).type('6874').should('have.value', '6874');

      cy.get(`[data-cy="integerMinMika"]`).type('3870').should('have.value', '3870');

      cy.get(`[data-cy="integerMaxMika"]`).type('66').should('have.value', '66');

      cy.get(`[data-cy="longMika"]`).type('44351').should('have.value', '44351');

      cy.get(`[data-cy="longRequiredMika"]`).type('10367').should('have.value', '10367');

      cy.get(`[data-cy="longMinMika"]`).type('16737').should('have.value', '16737');

      cy.get(`[data-cy="longMaxMika"]`).type('55').should('have.value', '55');

      cy.get(`[data-cy="floatMika"]`).type('14165').should('have.value', '14165');

      cy.get(`[data-cy="floatRequiredMika"]`).type('17441').should('have.value', '17441');

      cy.get(`[data-cy="floatMinMika"]`).type('65326').should('have.value', '65326');

      cy.get(`[data-cy="floatMaxMika"]`).type('9').should('have.value', '9');

      cy.get(`[data-cy="doubleRequiredMika"]`).type('29256').should('have.value', '29256');

      cy.get(`[data-cy="doubleMinMika"]`).type('70096').should('have.value', '70096');

      cy.get(`[data-cy="doubleMaxMika"]`).type('13').should('have.value', '13');

      cy.get(`[data-cy="bigDecimalRequiredMika"]`).type('67039').should('have.value', '67039');

      cy.get(`[data-cy="bigDecimalMinMika"]`).type('73516').should('have.value', '73516');

      cy.get(`[data-cy="bigDecimalMaxMika"]`).type('11').should('have.value', '11');

      cy.get(`[data-cy="localDateMika"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="localDateRequiredMika"]`).type('2016-02-07').blur().should('have.value', '2016-02-07');

      cy.get(`[data-cy="instantMika"]`).type('2016-02-07T20:32').blur().should('have.value', '2016-02-07T20:32');

      cy.get(`[data-cy="instanteRequiredMika"]`).type('2016-02-07T22:01').blur().should('have.value', '2016-02-07T22:01');

      cy.get(`[data-cy="zonedDateTimeMika"]`).type('2016-02-08T09:21').blur().should('have.value', '2016-02-08T09:21');

      cy.get(`[data-cy="zonedDateTimeRequiredMika"]`).type('2016-02-08T04:09').blur().should('have.value', '2016-02-08T04:09');

      cy.get(`[data-cy="durationMika"]`).type('PT21M').blur().should('have.value', 'PT21M');

      cy.get(`[data-cy="durationRequiredMika"]`).type('PT45M').blur().should('have.value', 'PT45M');

      cy.get(`[data-cy="booleanMika"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanMika"]`).click().should('be.checked');

      cy.get(`[data-cy="booleanRequiredMika"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanRequiredMika"]`).click().should('be.checked');

      cy.get(`[data-cy="enumMika"]`).select('ENUM_VALUE_1');

      cy.get(`[data-cy="enumRequiredMika"]`).select('ENUM_VALUE_2');

      cy.get(`[data-cy="uuidMika"]`)
        .type('ad6eebf6-01f5-4363-af7f-16d167279b3e')
        .invoke('val')
        .should('match', new RegExp('ad6eebf6-01f5-4363-af7f-16d167279b3e'));

      cy.get(`[data-cy="uuidRequiredMika"]`)
        .type('721cd73b-f9d3-417e-87dc-839755347408')
        .invoke('val')
        .should('match', new RegExp('721cd73b-f9d3-417e-87dc-839755347408'));

      cy.setFieldImageAsBytesOfEntity('byteImageMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageRequiredMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMinbytesMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMaxbytesMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyRequiredMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMinbytesMika', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMaxbytesMika', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="byteTextMika"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="byteTextRequiredMika"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fieldTestServiceImplEntity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fieldTestServiceImplEntityPageUrlPattern);
    });
  });
});
