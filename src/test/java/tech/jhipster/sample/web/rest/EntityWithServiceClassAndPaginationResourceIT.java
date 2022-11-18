package tech.jhipster.sample.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import tech.jhipster.sample.IntegrationTest;
import tech.jhipster.sample.domain.EntityWithServiceClassAndPagination;
import tech.jhipster.sample.repository.EntityWithServiceClassAndPaginationRepository;

/**
 * Integration tests for the {@link EntityWithServiceClassAndPaginationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class EntityWithServiceClassAndPaginationResourceIT {

    private static final String DEFAULT_ENZO = "AAAAAAAAAA";
    private static final String UPDATED_ENZO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/entity-with-service-class-and-paginations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private EntityWithServiceClassAndPaginationRepository entityWithServiceClassAndPaginationRepository;

    @Autowired
    private WebTestClient webTestClient;

    private EntityWithServiceClassAndPagination entityWithServiceClassAndPagination;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntityWithServiceClassAndPagination createEntity() {
        EntityWithServiceClassAndPagination entityWithServiceClassAndPagination = new EntityWithServiceClassAndPagination()
            .enzo(DEFAULT_ENZO);
        return entityWithServiceClassAndPagination;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntityWithServiceClassAndPagination createUpdatedEntity() {
        EntityWithServiceClassAndPagination entityWithServiceClassAndPagination = new EntityWithServiceClassAndPagination()
            .enzo(UPDATED_ENZO);
        return entityWithServiceClassAndPagination;
    }

    @BeforeEach
    public void setupCsrf() {
        webTestClient = webTestClient.mutateWith(csrf());
    }

    @BeforeEach
    public void initTest() {
        entityWithServiceClassAndPaginationRepository.deleteAll().block();
        entityWithServiceClassAndPagination = createEntity();
    }

    @Test
    void createEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeCreate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        // Create the EntityWithServiceClassAndPagination
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeCreate + 1);
        EntityWithServiceClassAndPagination testEntityWithServiceClassAndPagination = entityWithServiceClassAndPaginationList.get(
            entityWithServiceClassAndPaginationList.size() - 1
        );
        assertThat(testEntityWithServiceClassAndPagination.getEnzo()).isEqualTo(DEFAULT_ENZO);
    }

    @Test
    void createEntityWithServiceClassAndPaginationWithExistingId() throws Exception {
        // Create the EntityWithServiceClassAndPagination with an existing ID
        entityWithServiceClassAndPagination.setId("existing_id");

        int databaseSizeBeforeCreate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllEntityWithServiceClassAndPaginations() {
        // Initialize the database
        entityWithServiceClassAndPaginationRepository.save(entityWithServiceClassAndPagination).block();

        // Get all the entityWithServiceClassAndPaginationList
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
            .value(hasItem(entityWithServiceClassAndPagination.getId()))
            .jsonPath("$.[*].enzo")
            .value(hasItem(DEFAULT_ENZO));
    }

    @Test
    void getEntityWithServiceClassAndPagination() {
        // Initialize the database
        entityWithServiceClassAndPaginationRepository.save(entityWithServiceClassAndPagination).block();

        // Get the entityWithServiceClassAndPagination
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, entityWithServiceClassAndPagination.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(entityWithServiceClassAndPagination.getId()))
            .jsonPath("$.enzo")
            .value(is(DEFAULT_ENZO));
    }

    @Test
    void getNonExistingEntityWithServiceClassAndPagination() {
        // Get the entityWithServiceClassAndPagination
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingEntityWithServiceClassAndPagination() throws Exception {
        // Initialize the database
        entityWithServiceClassAndPaginationRepository.save(entityWithServiceClassAndPagination).block();

        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();

        // Update the entityWithServiceClassAndPagination
        EntityWithServiceClassAndPagination updatedEntityWithServiceClassAndPagination = entityWithServiceClassAndPaginationRepository
            .findById(entityWithServiceClassAndPagination.getId())
            .block();
        updatedEntityWithServiceClassAndPagination.enzo(UPDATED_ENZO);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedEntityWithServiceClassAndPagination.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(updatedEntityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
        EntityWithServiceClassAndPagination testEntityWithServiceClassAndPagination = entityWithServiceClassAndPaginationList.get(
            entityWithServiceClassAndPaginationList.size() - 1
        );
        assertThat(testEntityWithServiceClassAndPagination.getEnzo()).isEqualTo(UPDATED_ENZO);
    }

    @Test
    void putNonExistingEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        entityWithServiceClassAndPagination.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, entityWithServiceClassAndPagination.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        entityWithServiceClassAndPagination.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        entityWithServiceClassAndPagination.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateEntityWithServiceClassAndPaginationWithPatch() throws Exception {
        // Initialize the database
        entityWithServiceClassAndPaginationRepository.save(entityWithServiceClassAndPagination).block();

        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();

        // Update the entityWithServiceClassAndPagination using partial update
        EntityWithServiceClassAndPagination partialUpdatedEntityWithServiceClassAndPagination = new EntityWithServiceClassAndPagination();
        partialUpdatedEntityWithServiceClassAndPagination.setId(entityWithServiceClassAndPagination.getId());

        partialUpdatedEntityWithServiceClassAndPagination.enzo(UPDATED_ENZO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedEntityWithServiceClassAndPagination.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedEntityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
        EntityWithServiceClassAndPagination testEntityWithServiceClassAndPagination = entityWithServiceClassAndPaginationList.get(
            entityWithServiceClassAndPaginationList.size() - 1
        );
        assertThat(testEntityWithServiceClassAndPagination.getEnzo()).isEqualTo(UPDATED_ENZO);
    }

    @Test
    void fullUpdateEntityWithServiceClassAndPaginationWithPatch() throws Exception {
        // Initialize the database
        entityWithServiceClassAndPaginationRepository.save(entityWithServiceClassAndPagination).block();

        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();

        // Update the entityWithServiceClassAndPagination using partial update
        EntityWithServiceClassAndPagination partialUpdatedEntityWithServiceClassAndPagination = new EntityWithServiceClassAndPagination();
        partialUpdatedEntityWithServiceClassAndPagination.setId(entityWithServiceClassAndPagination.getId());

        partialUpdatedEntityWithServiceClassAndPagination.enzo(UPDATED_ENZO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedEntityWithServiceClassAndPagination.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedEntityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
        EntityWithServiceClassAndPagination testEntityWithServiceClassAndPagination = entityWithServiceClassAndPaginationList.get(
            entityWithServiceClassAndPaginationList.size() - 1
        );
        assertThat(testEntityWithServiceClassAndPagination.getEnzo()).isEqualTo(UPDATED_ENZO);
    }

    @Test
    void patchNonExistingEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        entityWithServiceClassAndPagination.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, entityWithServiceClassAndPagination.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        entityWithServiceClassAndPagination.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamEntityWithServiceClassAndPagination() throws Exception {
        int databaseSizeBeforeUpdate = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();
        entityWithServiceClassAndPagination.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(entityWithServiceClassAndPagination))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the EntityWithServiceClassAndPagination in the database
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteEntityWithServiceClassAndPagination() {
        // Initialize the database
        entityWithServiceClassAndPaginationRepository.save(entityWithServiceClassAndPagination).block();

        int databaseSizeBeforeDelete = entityWithServiceClassAndPaginationRepository.findAll().collectList().block().size();

        // Delete the entityWithServiceClassAndPagination
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, entityWithServiceClassAndPagination.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<EntityWithServiceClassAndPagination> entityWithServiceClassAndPaginationList = entityWithServiceClassAndPaginationRepository
            .findAll()
            .collectList()
            .block();
        assertThat(entityWithServiceClassAndPaginationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
