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

describe('FieldTestEntity e2e test', () => {
  const fieldTestEntityPageUrl = '/field-test-entity';
  const fieldTestEntityPageUrlPattern = new RegExp('/field-test-entity(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fieldTestEntitySample = {
    stringRequiredTom: 'vastly',
    numberPatternRequiredTom: '249',
    integerRequiredTom: 76055,
    longRequiredTom: 77495,
    floatRequiredTom: 6110,
    doubleRequiredTom: 80322,
    bigDecimalRequiredTom: 42097,
    localDateRequiredTom: '2016-02-08',
    instantRequiredTom: '2016-02-08T12:54:17.013Z',
    zonedDateTimeRequiredTom: '2016-02-08T15:49:51.372Z',
    durationRequiredTom: 5837,
    booleanRequiredTom: true,
    enumRequiredTom: 'ENUM_VALUE_2',
    uuidRequiredTom: '6bce0cbd-ff75-4646-aac4-fe401d683be5',
    byteImageRequiredTom: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteImageRequiredTomContentType: 'unknown',
    byteAnyRequiredTom: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteAnyRequiredTomContentType: 'unknown',
    byteTextRequiredTom: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
  };

  let fieldTestEntity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/field-test-entities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/field-test-entities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/field-test-entities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fieldTestEntity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/field-test-entities/${fieldTestEntity.id}`,
      }).then(() => {
        fieldTestEntity = undefined;
      });
    }
  });

  it('FieldTestEntities menu should load FieldTestEntities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('field-test-entity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FieldTestEntity').should('exist');
    cy.url().should('match', fieldTestEntityPageUrlPattern);
  });

  describe('FieldTestEntity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fieldTestEntityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FieldTestEntity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/field-test-entity/new$'));
        cy.getEntityCreateUpdateHeading('FieldTestEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestEntityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/field-test-entities',
          body: fieldTestEntitySample,
        }).then(({ body }) => {
          fieldTestEntity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/field-test-entities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [fieldTestEntity],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fieldTestEntityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FieldTestEntity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fieldTestEntity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestEntity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestEntity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestEntity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestEntityPageUrlPattern);
      });

      it('last delete button click should delete instance of FieldTestEntity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fieldTestEntity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestEntityPageUrlPattern);

        fieldTestEntity = undefined;
      });
    });
  });

  describe('new FieldTestEntity page', () => {
    beforeEach(() => {
      cy.visit(`${fieldTestEntityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FieldTestEntity');
    });

    it('should create an instance of FieldTestEntity', () => {
      cy.get(`[data-cy="stringTom"]`).type('Computer hacking').should('have.value', 'Computer hacking');

      cy.get(`[data-cy="stringRequiredTom"]`).type('DNS').should('have.value', 'DNS');

      cy.get(`[data-cy="stringMinlengthTom"]`).type('intent Hybrid').should('have.value', 'intent Hybrid');

      cy.get(`[data-cy="stringMaxlengthTom"]`).type('microchip').should('have.value', 'microchip');

      cy.get(`[data-cy="stringPatternTom"]`).type('NXzR').should('have.value', 'NXzR');

      cy.get(`[data-cy="numberPatternTom"]`).type('7112').should('have.value', '7112');

      cy.get(`[data-cy="numberPatternRequiredTom"]`).type('92394').should('have.value', '92394');

      cy.get(`[data-cy="integerTom"]`).type('36405').should('have.value', '36405');

      cy.get(`[data-cy="integerRequiredTom"]`).type('28626').should('have.value', '28626');

      cy.get(`[data-cy="integerMinTom"]`).type('46750').should('have.value', '46750');

      cy.get(`[data-cy="integerMaxTom"]`).type('65').should('have.value', '65');

      cy.get(`[data-cy="longTom"]`).type('80283').should('have.value', '80283');

      cy.get(`[data-cy="longRequiredTom"]`).type('7722').should('have.value', '7722');

      cy.get(`[data-cy="longMinTom"]`).type('14911').should('have.value', '14911');

      cy.get(`[data-cy="longMaxTom"]`).type('43').should('have.value', '43');

      cy.get(`[data-cy="floatTom"]`).type('7277').should('have.value', '7277');

      cy.get(`[data-cy="floatRequiredTom"]`).type('38154').should('have.value', '38154');

      cy.get(`[data-cy="floatMinTom"]`).type('56231').should('have.value', '56231');

      cy.get(`[data-cy="floatMaxTom"]`).type('18').should('have.value', '18');

      cy.get(`[data-cy="doubleRequiredTom"]`).type('52226').should('have.value', '52226');

      cy.get(`[data-cy="doubleMinTom"]`).type('57952').should('have.value', '57952');

      cy.get(`[data-cy="doubleMaxTom"]`).type('29').should('have.value', '29');

      cy.get(`[data-cy="bigDecimalRequiredTom"]`).type('44465').should('have.value', '44465');

      cy.get(`[data-cy="bigDecimalMinTom"]`).type('68695').should('have.value', '68695');

      cy.get(`[data-cy="bigDecimalMaxTom"]`).type('2').should('have.value', '2');

      cy.get(`[data-cy="localDateTom"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="localDateRequiredTom"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="instantTom"]`).type('2016-02-07T19:15').blur().should('have.value', '2016-02-07T19:15');

      cy.get(`[data-cy="instantRequiredTom"]`).type('2016-02-08T16:36').blur().should('have.value', '2016-02-08T16:36');

      cy.get(`[data-cy="zonedDateTimeTom"]`).type('2016-02-08T00:31').blur().should('have.value', '2016-02-08T00:31');

      cy.get(`[data-cy="zonedDateTimeRequiredTom"]`).type('2016-02-07T21:59').blur().should('have.value', '2016-02-07T21:59');

      cy.get(`[data-cy="durationTom"]`).type('PT21M').blur().should('have.value', 'PT21M');

      cy.get(`[data-cy="durationRequiredTom"]`).type('PT9M').blur().should('have.value', 'PT9M');

      cy.get(`[data-cy="booleanTom"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanTom"]`).click().should('be.checked');

      cy.get(`[data-cy="booleanRequiredTom"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanRequiredTom"]`).click().should('be.checked');

      cy.get(`[data-cy="enumTom"]`).select('ENUM_VALUE_2');

      cy.get(`[data-cy="enumRequiredTom"]`).select('ENUM_VALUE_1');

      cy.get(`[data-cy="uuidTom"]`)
        .type('e258c3d8-5ef6-4ab8-87f8-5d9ed5dbcf51')
        .invoke('val')
        .should('match', new RegExp('e258c3d8-5ef6-4ab8-87f8-5d9ed5dbcf51'));

      cy.get(`[data-cy="uuidRequiredTom"]`)
        .type('30b0deda-84c0-45f3-8ff1-b8a6dc46e029')
        .invoke('val')
        .should('match', new RegExp('30b0deda-84c0-45f3-8ff1-b8a6dc46e029'));

      cy.setFieldImageAsBytesOfEntity('byteImageTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageRequiredTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMinbytesTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMaxbytesTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyRequiredTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMinbytesTom', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMaxbytesTom', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="byteTextTom"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="byteTextRequiredTom"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fieldTestEntity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fieldTestEntityPageUrlPattern);
    });
  });
});
