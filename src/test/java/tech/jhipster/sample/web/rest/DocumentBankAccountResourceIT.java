package tech.jhipster.sample.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;
import static tech.jhipster.sample.web.rest.TestUtil.sameNumber;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.util.Base64Utils;
import tech.jhipster.sample.IntegrationTest;
import tech.jhipster.sample.domain.DocumentBankAccount;
import tech.jhipster.sample.domain.enumeration.BankAccountType;
import tech.jhipster.sample.repository.DocumentBankAccountRepository;
import tech.jhipster.sample.service.dto.DocumentBankAccountDTO;
import tech.jhipster.sample.service.mapper.DocumentBankAccountMapper;

/**
 * Integration tests for the {@link DocumentBankAccountResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class DocumentBankAccountResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_BANK_NUMBER = 1;
    private static final Integer UPDATED_BANK_NUMBER = 2;

    private static final Long DEFAULT_AGENCY_NUMBER = 1L;
    private static final Long UPDATED_AGENCY_NUMBER = 2L;

    private static final Float DEFAULT_LAST_OPERATION_DURATION = 1F;
    private static final Float UPDATED_LAST_OPERATION_DURATION = 2F;

    private static final Double DEFAULT_MEAN_OPERATION_DURATION = 1D;
    private static final Double UPDATED_MEAN_OPERATION_DURATION = 2D;

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);

    private static final LocalDate DEFAULT_OPENING_DAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_OPENING_DAY = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_LAST_OPERATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_OPERATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final BankAccountType DEFAULT_ACCOUNT_TYPE = BankAccountType.CHECKING;
    private static final BankAccountType UPDATED_ACCOUNT_TYPE = BankAccountType.SAVINGS;

    private static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/document-bank-accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private DocumentBankAccountRepository documentBankAccountRepository;

    @Autowired
    private DocumentBankAccountMapper documentBankAccountMapper;

    @Autowired
    private WebTestClient webTestClient;

    private DocumentBankAccount documentBankAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentBankAccount createEntity() {
        DocumentBankAccount documentBankAccount = new DocumentBankAccount()
            .name(DEFAULT_NAME)
            .bankNumber(DEFAULT_BANK_NUMBER)
            .agencyNumber(DEFAULT_AGENCY_NUMBER)
            .lastOperationDuration(DEFAULT_LAST_OPERATION_DURATION)
            .meanOperationDuration(DEFAULT_MEAN_OPERATION_DURATION)
            .balance(DEFAULT_BALANCE)
            .openingDay(DEFAULT_OPENING_DAY)
            .lastOperationDate(DEFAULT_LAST_OPERATION_DATE)
            .active(DEFAULT_ACTIVE)
            .accountType(DEFAULT_ACCOUNT_TYPE)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE)
            .description(DEFAULT_DESCRIPTION);
        return documentBankAccount;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentBankAccount createUpdatedEntity() {
        DocumentBankAccount documentBankAccount = new DocumentBankAccount()
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .balance(UPDATED_BALANCE)
            .openingDay(UPDATED_OPENING_DAY)
            .lastOperationDate(UPDATED_LAST_OPERATION_DATE)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);
        return documentBankAccount;
    }

    @BeforeEach
    public void setupCsrf() {
        webTestClient = webTestClient.mutateWith(csrf());
    }

    @BeforeEach
    public void initTest() {
        documentBankAccountRepository.deleteAll().block();
        documentBankAccount = createEntity();
    }

    @Test
    void createDocumentBankAccount() throws Exception {
        int databaseSizeBeforeCreate = documentBankAccountRepository.findAll().collectList().block().size();
        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentBankAccount testDocumentBankAccount = documentBankAccountList.get(documentBankAccountList.size() - 1);
        assertThat(testDocumentBankAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDocumentBankAccount.getBankNumber()).isEqualTo(DEFAULT_BANK_NUMBER);
        assertThat(testDocumentBankAccount.getAgencyNumber()).isEqualTo(DEFAULT_AGENCY_NUMBER);
        assertThat(testDocumentBankAccount.getLastOperationDuration()).isEqualTo(DEFAULT_LAST_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getMeanOperationDuration()).isEqualTo(DEFAULT_MEAN_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getBalance()).isEqualByComparingTo(DEFAULT_BALANCE);
        assertThat(testDocumentBankAccount.getOpeningDay()).isEqualTo(DEFAULT_OPENING_DAY);
        assertThat(testDocumentBankAccount.getLastOperationDate()).isEqualTo(DEFAULT_LAST_OPERATION_DATE);
        assertThat(testDocumentBankAccount.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testDocumentBankAccount.getAccountType()).isEqualTo(DEFAULT_ACCOUNT_TYPE);
        assertThat(testDocumentBankAccount.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testDocumentBankAccount.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testDocumentBankAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    void createDocumentBankAccountWithExistingId() throws Exception {
        // Create the DocumentBankAccount with an existing ID
        documentBankAccount.setId("existing_id");
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        int databaseSizeBeforeCreate = documentBankAccountRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentBankAccountRepository.findAll().collectList().block().size();
        // set the field null
        documentBankAccount.setName(null);

        // Create the DocumentBankAccount, which fails.
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkBalanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentBankAccountRepository.findAll().collectList().block().size();
        // set the field null
        documentBankAccount.setBalance(null);

        // Create the DocumentBankAccount, which fails.
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllDocumentBankAccountsAsStream() {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        List<DocumentBankAccount> documentBankAccountList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(DocumentBankAccountDTO.class)
            .getResponseBody()
            .map(documentBankAccountMapper::toEntity)
            .filter(documentBankAccount::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(documentBankAccountList).isNotNull();
        assertThat(documentBankAccountList).hasSize(1);
        DocumentBankAccount testDocumentBankAccount = documentBankAccountList.get(0);
        assertThat(testDocumentBankAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDocumentBankAccount.getBankNumber()).isEqualTo(DEFAULT_BANK_NUMBER);
        assertThat(testDocumentBankAccount.getAgencyNumber()).isEqualTo(DEFAULT_AGENCY_NUMBER);
        assertThat(testDocumentBankAccount.getLastOperationDuration()).isEqualTo(DEFAULT_LAST_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getMeanOperationDuration()).isEqualTo(DEFAULT_MEAN_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getBalance()).isEqualByComparingTo(DEFAULT_BALANCE);
        assertThat(testDocumentBankAccount.getOpeningDay()).isEqualTo(DEFAULT_OPENING_DAY);
        assertThat(testDocumentBankAccount.getLastOperationDate()).isEqualTo(DEFAULT_LAST_OPERATION_DATE);
        assertThat(testDocumentBankAccount.getActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testDocumentBankAccount.getAccountType()).isEqualTo(DEFAULT_ACCOUNT_TYPE);
        assertThat(testDocumentBankAccount.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testDocumentBankAccount.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testDocumentBankAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    void getAllDocumentBankAccounts() {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        // Get all the documentBankAccountList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(documentBankAccount.getId()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].bankNumber")
            .value(hasItem(DEFAULT_BANK_NUMBER))
            .jsonPath("$.[*].agencyNumber")
            .value(hasItem(DEFAULT_AGENCY_NUMBER.intValue()))
            .jsonPath("$.[*].lastOperationDuration")
            .value(hasItem(DEFAULT_LAST_OPERATION_DURATION.doubleValue()))
            .jsonPath("$.[*].meanOperationDuration")
            .value(hasItem(DEFAULT_MEAN_OPERATION_DURATION.doubleValue()))
            .jsonPath("$.[*].balance")
            .value(hasItem(sameNumber(DEFAULT_BALANCE)))
            .jsonPath("$.[*].openingDay")
            .value(hasItem(DEFAULT_OPENING_DAY.toString()))
            .jsonPath("$.[*].lastOperationDate")
            .value(hasItem(DEFAULT_LAST_OPERATION_DATE.toString()))
            .jsonPath("$.[*].active")
            .value(hasItem(DEFAULT_ACTIVE.booleanValue()))
            .jsonPath("$.[*].accountType")
            .value(hasItem(DEFAULT_ACCOUNT_TYPE.toString()))
            .jsonPath("$.[*].attachmentContentType")
            .value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .jsonPath("$.[*].attachment")
            .value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    void getDocumentBankAccount() {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        // Get the documentBankAccount
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, documentBankAccount.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(documentBankAccount.getId()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.bankNumber")
            .value(is(DEFAULT_BANK_NUMBER))
            .jsonPath("$.agencyNumber")
            .value(is(DEFAULT_AGENCY_NUMBER.intValue()))
            .jsonPath("$.lastOperationDuration")
            .value(is(DEFAULT_LAST_OPERATION_DURATION.doubleValue()))
            .jsonPath("$.meanOperationDuration")
            .value(is(DEFAULT_MEAN_OPERATION_DURATION.doubleValue()))
            .jsonPath("$.balance")
            .value(is(sameNumber(DEFAULT_BALANCE)))
            .jsonPath("$.openingDay")
            .value(is(DEFAULT_OPENING_DAY.toString()))
            .jsonPath("$.lastOperationDate")
            .value(is(DEFAULT_LAST_OPERATION_DATE.toString()))
            .jsonPath("$.active")
            .value(is(DEFAULT_ACTIVE.booleanValue()))
            .jsonPath("$.accountType")
            .value(is(DEFAULT_ACCOUNT_TYPE.toString()))
            .jsonPath("$.attachmentContentType")
            .value(is(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .jsonPath("$.attachment")
            .value(is(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    void getNonExistingDocumentBankAccount() {
        // Get the documentBankAccount
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingDocumentBankAccount() throws Exception {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();

        // Update the documentBankAccount
        DocumentBankAccount updatedDocumentBankAccount = documentBankAccountRepository.findById(documentBankAccount.getId()).block();
        updatedDocumentBankAccount
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .balance(UPDATED_BALANCE)
            .openingDay(UPDATED_OPENING_DAY)
            .lastOperationDate(UPDATED_LAST_OPERATION_DATE)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(updatedDocumentBankAccount);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, documentBankAccountDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
        DocumentBankAccount testDocumentBankAccount = documentBankAccountList.get(documentBankAccountList.size() - 1);
        assertThat(testDocumentBankAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDocumentBankAccount.getBankNumber()).isEqualTo(UPDATED_BANK_NUMBER);
        assertThat(testDocumentBankAccount.getAgencyNumber()).isEqualTo(UPDATED_AGENCY_NUMBER);
        assertThat(testDocumentBankAccount.getLastOperationDuration()).isEqualTo(UPDATED_LAST_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getMeanOperationDuration()).isEqualTo(UPDATED_MEAN_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getBalance()).isEqualByComparingTo(UPDATED_BALANCE);
        assertThat(testDocumentBankAccount.getOpeningDay()).isEqualTo(UPDATED_OPENING_DAY);
        assertThat(testDocumentBankAccount.getLastOperationDate()).isEqualTo(UPDATED_LAST_OPERATION_DATE);
        assertThat(testDocumentBankAccount.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testDocumentBankAccount.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
        assertThat(testDocumentBankAccount.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testDocumentBankAccount.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testDocumentBankAccount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void putNonExistingDocumentBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();
        documentBankAccount.setId(UUID.randomUUID().toString());

        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, documentBankAccountDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDocumentBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();
        documentBankAccount.setId(UUID.randomUUID().toString());

        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDocumentBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();
        documentBankAccount.setId(UUID.randomUUID().toString());

        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDocumentBankAccountWithPatch() throws Exception {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();

        // Update the documentBankAccount using partial update
        DocumentBankAccount partialUpdatedDocumentBankAccount = new DocumentBankAccount();
        partialUpdatedDocumentBankAccount.setId(documentBankAccount.getId());

        partialUpdatedDocumentBankAccount
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .openingDay(UPDATED_OPENING_DAY)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDocumentBankAccount.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDocumentBankAccount))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
        DocumentBankAccount testDocumentBankAccount = documentBankAccountList.get(documentBankAccountList.size() - 1);
        assertThat(testDocumentBankAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDocumentBankAccount.getBankNumber()).isEqualTo(DEFAULT_BANK_NUMBER);
        assertThat(testDocumentBankAccount.getAgencyNumber()).isEqualTo(UPDATED_AGENCY_NUMBER);
        assertThat(testDocumentBankAccount.getLastOperationDuration()).isEqualTo(DEFAULT_LAST_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getMeanOperationDuration()).isEqualTo(UPDATED_MEAN_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getBalance()).isEqualByComparingTo(DEFAULT_BALANCE);
        assertThat(testDocumentBankAccount.getOpeningDay()).isEqualTo(UPDATED_OPENING_DAY);
        assertThat(testDocumentBankAccount.getLastOperationDate()).isEqualTo(DEFAULT_LAST_OPERATION_DATE);
        assertThat(testDocumentBankAccount.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testDocumentBankAccount.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
        assertThat(testDocumentBankAccount.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testDocumentBankAccount.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testDocumentBankAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    void fullUpdateDocumentBankAccountWithPatch() throws Exception {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();

        // Update the documentBankAccount using partial update
        DocumentBankAccount partialUpdatedDocumentBankAccount = new DocumentBankAccount();
        partialUpdatedDocumentBankAccount.setId(documentBankAccount.getId());

        partialUpdatedDocumentBankAccount
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .balance(UPDATED_BALANCE)
            .openingDay(UPDATED_OPENING_DAY)
            .lastOperationDate(UPDATED_LAST_OPERATION_DATE)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDocumentBankAccount.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDocumentBankAccount))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
        DocumentBankAccount testDocumentBankAccount = documentBankAccountList.get(documentBankAccountList.size() - 1);
        assertThat(testDocumentBankAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDocumentBankAccount.getBankNumber()).isEqualTo(UPDATED_BANK_NUMBER);
        assertThat(testDocumentBankAccount.getAgencyNumber()).isEqualTo(UPDATED_AGENCY_NUMBER);
        assertThat(testDocumentBankAccount.getLastOperationDuration()).isEqualTo(UPDATED_LAST_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getMeanOperationDuration()).isEqualTo(UPDATED_MEAN_OPERATION_DURATION);
        assertThat(testDocumentBankAccount.getBalance()).isEqualByComparingTo(UPDATED_BALANCE);
        assertThat(testDocumentBankAccount.getOpeningDay()).isEqualTo(UPDATED_OPENING_DAY);
        assertThat(testDocumentBankAccount.getLastOperationDate()).isEqualTo(UPDATED_LAST_OPERATION_DATE);
        assertThat(testDocumentBankAccount.getActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testDocumentBankAccount.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
        assertThat(testDocumentBankAccount.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testDocumentBankAccount.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testDocumentBankAccount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void patchNonExistingDocumentBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();
        documentBankAccount.setId(UUID.randomUUID().toString());

        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, documentBankAccountDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDocumentBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();
        documentBankAccount.setId(UUID.randomUUID().toString());

        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDocumentBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = documentBankAccountRepository.findAll().collectList().block().size();
        documentBankAccount.setId(UUID.randomUUID().toString());

        // Create the DocumentBankAccount
        DocumentBankAccountDTO documentBankAccountDTO = documentBankAccountMapper.toDto(documentBankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(documentBankAccountDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the DocumentBankAccount in the database
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDocumentBankAccount() {
        // Initialize the database
        documentBankAccountRepository.save(documentBankAccount).block();

        int databaseSizeBeforeDelete = documentBankAccountRepository.findAll().collectList().block().size();

        // Delete the documentBankAccount
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, documentBankAccount.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<DocumentBankAccount> documentBankAccountList = documentBankAccountRepository.findAll().collectList().block();
        assertThat(documentBankAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
