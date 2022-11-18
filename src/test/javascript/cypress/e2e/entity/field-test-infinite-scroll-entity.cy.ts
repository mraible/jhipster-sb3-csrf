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

describe('FieldTestInfiniteScrollEntity e2e test', () => {
  const fieldTestInfiniteScrollEntityPageUrl = '/field-test-infinite-scroll-entity';
  const fieldTestInfiniteScrollEntityPageUrlPattern = new RegExp('/field-test-infinite-scroll-entity(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const fieldTestInfiniteScrollEntitySample = {
    stringRequiredHugo: 'since Regional Wooden',
    integerRequiredHugo: 26215,
    longRequiredHugo: 12814,
    floatRequiredHugo: 46748,
    doubleRequiredHugo: 99571,
    bigDecimalRequiredHugo: 47949,
    localDateRequiredHugo: '2016-02-08',
    instanteRequiredHugo: '2016-02-08T03:44:14.452Z',
    zonedDateTimeRequiredHugo: '2016-02-08T10:35:20.521Z',
    durationRequiredHugo: 17143,
    booleanRequiredHugo: true,
    enumRequiredHugo: 'ENUM_VALUE_2',
    uuidRequiredHugo: '86c571d1-dd57-4e16-a4e8-2a7811bad00b',
    byteImageRequiredHugo: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteImageRequiredHugoContentType: 'unknown',
    byteAnyRequiredHugo: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci5wbmc=',
    byteAnyRequiredHugoContentType: 'unknown',
    byteTextRequiredHugo: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=',
  };

  let fieldTestInfiniteScrollEntity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/field-test-infinite-scroll-entities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/field-test-infinite-scroll-entities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/field-test-infinite-scroll-entities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (fieldTestInfiniteScrollEntity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/field-test-infinite-scroll-entities/${fieldTestInfiniteScrollEntity.id}`,
      }).then(() => {
        fieldTestInfiniteScrollEntity = undefined;
      });
    }
  });

  it('FieldTestInfiniteScrollEntities menu should load FieldTestInfiniteScrollEntities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('field-test-infinite-scroll-entity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FieldTestInfiniteScrollEntity').should('exist');
    cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);
  });

  describe('FieldTestInfiniteScrollEntity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(fieldTestInfiniteScrollEntityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FieldTestInfiniteScrollEntity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/field-test-infinite-scroll-entity/new$'));
        cy.getEntityCreateUpdateHeading('FieldTestInfiniteScrollEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/field-test-infinite-scroll-entities',
          body: fieldTestInfiniteScrollEntitySample,
        }).then(({ body }) => {
          fieldTestInfiniteScrollEntity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/field-test-infinite-scroll-entities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/field-test-infinite-scroll-entities?page=0&size=20>; rel="last",<http://localhost/api/field-test-infinite-scroll-entities?page=0&size=20>; rel="first"',
              },
              body: [fieldTestInfiniteScrollEntity],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(fieldTestInfiniteScrollEntityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FieldTestInfiniteScrollEntity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('fieldTestInfiniteScrollEntity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestInfiniteScrollEntity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestInfiniteScrollEntity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);
      });

      it('edit button click should load edit FieldTestInfiniteScrollEntity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FieldTestInfiniteScrollEntity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);
      });

      it('last delete button click should delete instance of FieldTestInfiniteScrollEntity', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('fieldTestInfiniteScrollEntity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);

        fieldTestInfiniteScrollEntity = undefined;
      });
    });
  });

  describe('new FieldTestInfiniteScrollEntity page', () => {
    beforeEach(() => {
      cy.visit(`${fieldTestInfiniteScrollEntityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FieldTestInfiniteScrollEntity');
    });

    it('should create an instance of FieldTestInfiniteScrollEntity', () => {
      cy.get(`[data-cy="stringHugo"]`).type('Rhenium').should('have.value', 'Rhenium');

      cy.get(`[data-cy="stringRequiredHugo"]`).type('Francium').should('have.value', 'Francium');

      cy.get(`[data-cy="stringMinlengthHugo"]`).type('now Health female').should('have.value', 'now Health female');

      cy.get(`[data-cy="stringMaxlengthHugo"]`).type('Carmichael trunk syn').should('have.value', 'Carmichael trunk syn');

      cy.get(`[data-cy="stringPatternHugo"]`).type('mL').should('have.value', 'mL');

      cy.get(`[data-cy="integerHugo"]`).type('43298').should('have.value', '43298');

      cy.get(`[data-cy="integerRequiredHugo"]`).type('15092').should('have.value', '15092');

      cy.get(`[data-cy="integerMinHugo"]`).type('13635').should('have.value', '13635');

      cy.get(`[data-cy="integerMaxHugo"]`).type('70').should('have.value', '70');

      cy.get(`[data-cy="longHugo"]`).type('80349').should('have.value', '80349');

      cy.get(`[data-cy="longRequiredHugo"]`).type('21367').should('have.value', '21367');

      cy.get(`[data-cy="longMinHugo"]`).type('80640').should('have.value', '80640');

      cy.get(`[data-cy="longMaxHugo"]`).type('52').should('have.value', '52');

      cy.get(`[data-cy="floatHugo"]`).type('5920').should('have.value', '5920');

      cy.get(`[data-cy="floatRequiredHugo"]`).type('16143').should('have.value', '16143');

      cy.get(`[data-cy="floatMinHugo"]`).type('14031').should('have.value', '14031');

      cy.get(`[data-cy="floatMaxHugo"]`).type('56').should('have.value', '56');

      cy.get(`[data-cy="doubleRequiredHugo"]`).type('27945').should('have.value', '27945');

      cy.get(`[data-cy="doubleMinHugo"]`).type('89518').should('have.value', '89518');

      cy.get(`[data-cy="doubleMaxHugo"]`).type('31').should('have.value', '31');

      cy.get(`[data-cy="bigDecimalRequiredHugo"]`).type('16963').should('have.value', '16963');

      cy.get(`[data-cy="bigDecimalMinHugo"]`).type('72163').should('have.value', '72163');

      cy.get(`[data-cy="bigDecimalMaxHugo"]`).type('3').should('have.value', '3');

      cy.get(`[data-cy="localDateHugo"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="localDateRequiredHugo"]`).type('2016-02-08').blur().should('have.value', '2016-02-08');

      cy.get(`[data-cy="instantHugo"]`).type('2016-02-08T12:47').blur().should('have.value', '2016-02-08T12:47');

      cy.get(`[data-cy="instanteRequiredHugo"]`).type('2016-02-07T23:42').blur().should('have.value', '2016-02-07T23:42');

      cy.get(`[data-cy="zonedDateTimeHugo"]`).type('2016-02-08T10:59').blur().should('have.value', '2016-02-08T10:59');

      cy.get(`[data-cy="zonedDateTimeRequiredHugo"]`).type('2016-02-08T13:02').blur().should('have.value', '2016-02-08T13:02');

      cy.get(`[data-cy="durationHugo"]`).type('PT32M').blur().should('have.value', 'PT32M');

      cy.get(`[data-cy="durationRequiredHugo"]`).type('PT7M').blur().should('have.value', 'PT7M');

      cy.get(`[data-cy="booleanHugo"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanHugo"]`).click().should('be.checked');

      cy.get(`[data-cy="booleanRequiredHugo"]`).should('not.be.checked');
      cy.get(`[data-cy="booleanRequiredHugo"]`).click().should('be.checked');

      cy.get(`[data-cy="enumHugo"]`).select('ENUM_VALUE_3');

      cy.get(`[data-cy="enumRequiredHugo"]`).select('ENUM_VALUE_2');

      cy.get(`[data-cy="uuidHugo"]`)
        .type('e76f6c81-47a6-4f07-9be9-66e29d26aca8')
        .invoke('val')
        .should('match', new RegExp('e76f6c81-47a6-4f07-9be9-66e29d26aca8'));

      cy.get(`[data-cy="uuidRequiredHugo"]`)
        .type('2d0b512a-43fb-455b-b01b-0e72520274db')
        .invoke('val')
        .should('match', new RegExp('2d0b512a-43fb-455b-b01b-0e72520274db'));

      cy.setFieldImageAsBytesOfEntity('byteImageHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageRequiredHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMinbytesHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteImageMaxbytesHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyRequiredHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMinbytesHugo', 'integration-test.png', 'image/png');

      cy.setFieldImageAsBytesOfEntity('byteAnyMaxbytesHugo', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="byteTextHugo"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="byteTextRequiredHugo"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        fieldTestInfiniteScrollEntity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', fieldTestInfiniteScrollEntityPageUrlPattern);
    });
  });
});
