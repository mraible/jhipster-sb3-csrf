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

describe('FieldTestMapstructAndServiceClassEntity e2e test', () => {
  const fieldTestMapstructAndServiceClassEntityPageUrl = '/field-test-mapstruct-and-service-class-entity';
  const fieldTestMapstructAndServiceClassEntityPageUrlPattern = new RegExp('/field-test-mapstruct-and-service-class-entity(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fieldTestMapstructAndServiceClassEntitySample = {
    stringRequiredEva: 'Home Hafnium',
    integerRequiredEva: 20026,
    longRequiredEva: 14827,
    floatRequiredEva: 67122,
    doubleRequiredEva: 29643,
    bigDecimalRequiredEva: 51007,
    localDateRequiredEva: '2016-02-08',
    instanteRequiredEva: '2016-02-08T14:54:45.280Z',
    zonedDateTimeRequiredEva: '2016-02-08T05:10:33.425Z',
    durationRequiredEva: 71046,
    booleanRequiredEva: false,
    enumRequiredEva: 'ENUM_VALUE_1',
    uuidRequiredEva: '351364a7-9bad-475b-ad26-90e41ec367cd',
    byteImageRequiredEva: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteImageRequiredEvaContentType: 'unknown',
    byteAnyRequiredEva: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteAnyRequiredEvaContentType: 'unknown',
    byteTextRequiredEva: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
  };

  let fieldTestMapstructAndServiceClassEntity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/field-test-mapstruct-and-service-class-entities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/field-test-mapstruct-and-service-class-entities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/field-test-mapstruct-and-service-class-entities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fieldTestMapstructAndServiceClassEntity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/field-test-mapstruct-and-service-class-entities/${fieldTestMapstructAndServiceClassEntity.id}`,
      }).then(() => {
        fieldTestMapstructAndServiceClassEntity = undefined;
      });
    }
  });

  it('FieldTestMapstructAndServiceClassEntities menu should load FieldTestMapstructAndServiceClassEntities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('field-test-mapstruct-and-service-class-entity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FieldTestMapstructAndServiceClassEntity').should('exist');
    cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);
  });

  describe('FieldTestMapstructAndServiceClassEntity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fieldTestMapstructAndServiceClassEntityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FieldTestMapstructAndServiceClassEntity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/field-test-mapstruct-and-service-class-entity/new$'));
        cy.getEntityCreateUpdateHeading('FieldTestMapstructAndServiceClassEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/field-test-mapstruct-and-service-class-entities',
          body: fieldTestMapstructAndServiceClassEntitySample,
        }).then(({ body }) => {
          fieldTestMapstructAndServiceClassEntity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/field-test-mapstruct-and-service-class-entities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [fieldTestMapstructAndServiceClassEntity],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fieldTestMapstructAndServiceClassEntityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FieldTestMapstructAndServiceClassEntity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fieldTestMapstructAndServiceClassEntity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestMapstructAndServiceClassEntity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestMapstructAndServiceClassEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestMapstructAndServiceClassEntity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestMapstructAndServiceClassEntity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);
      });

      it('last delete button click should delete instance of FieldTestMapstructAndServiceClassEntity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fieldTestMapstructAndServiceClassEntity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);

        fieldTestMapstructAndServiceClassEntity = undefined;
      });
    });
  });

  describe('new FieldTestMapstructAndServiceClassEntity page', () => {
    beforeEach(() => {
      cy.visit(`${fieldTestMapstructAndServiceClassEntityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FieldTestMapstructAndServiceClassEntity');
    });

    it('should create an instance of FieldTestMapstructAndServiceClassEntity', () => {
      cy.get(`[data-cy="stringEva"]`).type('Cadillac').should('have.value', 'Cadillac');

      cy.get(`[data-cy="stringRequiredEva"]`).type('yum calculating').should('have.value', 'yum calculating');

      cy.get(`[data-cy="stringMinlengthEva"]`).type('infrastructures East Account').should('have.value', 'infrastructures East Account');

      cy.get(`[data-cy="stringMaxlengthEva"]`).type('UTF8').should('have.value', 'UTF8');

      cy.get(`[data-cy="integerEva"]`).type('54186').should('have.value', '54186');

      cy.get(`[data-cy="integerRequiredEva"]`).type('17489').should('have.value', '17489');

      cy.get(`[data-cy="integerMinEva"]`).type('30082').should('have.value', '30082');

      cy.get(`[data-cy="integerMaxEva"]`).type('44').should('have.value', '44');

      cy.get(`[data-cy="longEva"]`).type('80353').should('have.value', '80353');

      cy.get(`[data-cy="longRequiredEva"]`).type('37609').should('have.value', '37609');

      cy.get(`[data-cy="longMinEva"]`).type('99739').should('have.value', '99739');

      cy.get(`[data-cy="longMaxEva"]`).type('51').should('have.value', '51');

      cy.get(`[data-cy="floatEva"]`).type('14722').should('have.value', '14722');

      cy.get(`[data-cy="floatRequiredEva"]`).type('64193').should('have.value', '64193');

      cy.get(`[data-cy="floatMinEva"]`).type('72731').should('have.value', '72731');

      cy.get(`[data-cy="floatMaxEva"]`).type('83').should('have.value', '83');

      cy.get(`[data-cy="doubleRequiredEva"]`).type('21571').should('have.value', '21571');

      cy.get(`[data-cy="doubleMinEva"]`).type('54609').should('have.value', '54609');

      cy.get(`[data-cy="doubleMaxEva"]`).type('54').should('have.value', '54');

      cy.get(`[data-cy="bigDecimalRequiredEva"]`).type('84616').should('have.value', '84616');

      cy.get(`[data-cy="bigDecimalMinEva"]`).type('35558').should('have.value', '35558');

      cy.get(`[data-cy="bigDecimalMaxEva"]`).type('90').should('have.value', '90');

      cy.get(`[data-cy="localDateEva"]`).type('2016-02-07').blur().should('have.value', '2016-02-07');

      cy.get(`[data-cy="localDateRequiredEva"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="instantEva"]`).type('2016-02-08T04:48').blur().should('have.value', '2016-02-08T04:48');

      cy.get(`[data-cy="instanteRequiredEva"]`).type('2016-02-08T04:59').blur().should('have.value', '2016-02-08T04:59');

      cy.get(`[data-cy="zonedDateTimeEva"]`).type('2016-02-07T20:21').blur().should('have.value', '2016-02-07T20:21');

      cy.get(`[data-cy="zonedDateTimeRequiredEva"]`).type('2016-02-08T03:34').blur().should('have.value', '2016-02-08T03:34');

      cy.get(`[data-cy="durationEva"]`).type('PT30M').blur().should('have.value', 'PT30M');

      cy.get(`[data-cy="durationRequiredEva"]`).type('PT36M').blur().should('have.value', 'PT36M');

      cy.get(`[data-cy="booleanEva"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanEva"]`).click().should('be.checked');

      cy.get(`[data-cy="booleanRequiredEva"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanRequiredEva"]`).click().should('be.checked');

      cy.get(`[data-cy="enumEva"]`).select('ENUM_VALUE_2');

      cy.get(`[data-cy="enumRequiredEva"]`).select('ENUM_VALUE_3');

      cy.get(`[data-cy="uuidEva"]`)
        .type('c7f0d214-e385-4992-96a1-d116dc013832')
        .invoke('val')
        .should('match', new RegExp('c7f0d214-e385-4992-96a1-d116dc013832'));

      cy.get(`[data-cy="uuidRequiredEva"]`)
        .type('f6c55ab7-7d2e-4f39-b34b-2a6e0caaf76f')
        .invoke('val')
        .should('match', new RegExp('f6c55ab7-7d2e-4f39-b34b-2a6e0caaf76f'));

      cy.setFieldImageAsBytesOfEntity('byteImageEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageRequiredEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMinbytesEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMaxbytesEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyRequiredEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMinbytesEva', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMaxbytesEva', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="byteTextEva"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="byteTextRequiredEva"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fieldTestMapstructAndServiceClassEntity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fieldTestMapstructAndServiceClassEntityPageUrlPattern);
    });
  });
});
