package tech.jhipster.sample.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.csrf;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.util.Base64Utils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.IntegrationTest;
import tech.jhipster.sample.domain.Place;
import tech.jhipster.sample.repository.PlaceRepository;

/**
 * Integration tests for the {@link PlaceResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class PlaceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER_OF_SEATS = 1L;
    private static final Long UPDATED_NUMBER_OF_SEATS = 2L;

    private static final String DEFAULT_SHORT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR_BACKGROUND = "AAAAAAAAAA";
    private static final String UPDATED_COLOR_BACKGROUND = "BBBBBBBBBB";

    private static final String DEFAULT_COLOR_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_COLOR_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/places";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private PlaceRepository placeRepository;

    @Mock
    private PlaceRepository placeRepositoryMock;

    @Autowired
    private WebTestClient webTestClient;

    private Place place;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Place createEntity() {
        Place place = new Place()
            .name(DEFAULT_NAME)
            .numberOfSeats(DEFAULT_NUMBER_OF_SEATS)
            .shortName(DEFAULT_SHORT_NAME)
            .colorBackground(DEFAULT_COLOR_BACKGROUND)
            .colorText(DEFAULT_COLOR_TEXT)
            .description(DEFAULT_DESCRIPTION);
        return place;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Place createUpdatedEntity() {
        Place place = new Place()
            .name(UPDATED_NAME)
            .numberOfSeats(UPDATED_NUMBER_OF_SEATS)
            .shortName(UPDATED_SHORT_NAME)
            .colorBackground(UPDATED_COLOR_BACKGROUND)
            .colorText(UPDATED_COLOR_TEXT)
            .description(UPDATED_DESCRIPTION);
        return place;
    }

    @BeforeEach
    public void setupCsrf() {
        webTestClient = webTestClient.mutateWith(csrf());
    }

    @BeforeEach
    public void initTest() {
        placeRepository.deleteAll().block();
        place = createEntity();
    }

    @Test
    void createPlace() throws Exception {
        int databaseSizeBeforeCreate = placeRepository.findAll().collectList().block().size();
        // Create the Place
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeCreate + 1);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlace.getNumberOfSeats()).isEqualTo(DEFAULT_NUMBER_OF_SEATS);
        assertThat(testPlace.getShortName()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testPlace.getColorBackground()).isEqualTo(DEFAULT_COLOR_BACKGROUND);
        assertThat(testPlace.getColorText()).isEqualTo(DEFAULT_COLOR_TEXT);
        assertThat(testPlace.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    void createPlaceWithExistingId() throws Exception {
        // Create the Place with an existing ID
        place.setId("existing_id");

        int databaseSizeBeforeCreate = placeRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = placeRepository.findAll().collectList().block().size();
        // set the field null
        place.setName(null);

        // Create the Place, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllPlaces() {
        // Initialize the database
        placeRepository.save(place).block();

        // Get all the placeList
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
            .value(hasItem(place.getId()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].numberOfSeats")
            .value(hasItem(DEFAULT_NUMBER_OF_SEATS.intValue()))
            .jsonPath("$.[*].shortName")
            .value(hasItem(DEFAULT_SHORT_NAME))
            .jsonPath("$.[*].colorBackground")
            .value(hasItem(DEFAULT_COLOR_BACKGROUND))
            .jsonPath("$.[*].colorText")
            .value(hasItem(DEFAULT_COLOR_TEXT))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION.toString()));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPlacesWithEagerRelationshipsIsEnabled() {
        when(placeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(placeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPlacesWithEagerRelationshipsIsNotEnabled() {
        when(placeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(placeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getPlace() {
        // Initialize the database
        placeRepository.save(place).block();

        // Get the place
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, place.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(place.getId()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.numberOfSeats")
            .value(is(DEFAULT_NUMBER_OF_SEATS.intValue()))
            .jsonPath("$.shortName")
            .value(is(DEFAULT_SHORT_NAME))
            .jsonPath("$.colorBackground")
            .value(is(DEFAULT_COLOR_BACKGROUND))
            .jsonPath("$.colorText")
            .value(is(DEFAULT_COLOR_TEXT))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    void getNonExistingPlace() {
        // Get the place
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingPlace() throws Exception {
        // Initialize the database
        placeRepository.save(place).block();

        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();

        // Update the place
        Place updatedPlace = placeRepository.findById(place.getId()).block();
        updatedPlace
            .name(UPDATED_NAME)
            .numberOfSeats(UPDATED_NUMBER_OF_SEATS)
            .shortName(UPDATED_SHORT_NAME)
            .colorBackground(UPDATED_COLOR_BACKGROUND)
            .colorText(UPDATED_COLOR_TEXT)
            .description(UPDATED_DESCRIPTION);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedPlace.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(updatedPlace))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlace.getNumberOfSeats()).isEqualTo(UPDATED_NUMBER_OF_SEATS);
        assertThat(testPlace.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testPlace.getColorBackground()).isEqualTo(UPDATED_COLOR_BACKGROUND);
        assertThat(testPlace.getColorText()).isEqualTo(UPDATED_COLOR_TEXT);
        assertThat(testPlace.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void putNonExistingPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();
        place.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, place.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();
        place.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();
        place.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePlaceWithPatch() throws Exception {
        // Initialize the database
        placeRepository.save(place).block();

        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();

        // Update the place using partial update
        Place partialUpdatedPlace = new Place();
        partialUpdatedPlace.setId(place.getId());

        partialUpdatedPlace
            .numberOfSeats(UPDATED_NUMBER_OF_SEATS)
            .shortName(UPDATED_SHORT_NAME)
            .colorText(UPDATED_COLOR_TEXT)
            .description(UPDATED_DESCRIPTION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPlace.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPlace))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlace.getNumberOfSeats()).isEqualTo(UPDATED_NUMBER_OF_SEATS);
        assertThat(testPlace.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testPlace.getColorBackground()).isEqualTo(DEFAULT_COLOR_BACKGROUND);
        assertThat(testPlace.getColorText()).isEqualTo(UPDATED_COLOR_TEXT);
        assertThat(testPlace.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void fullUpdatePlaceWithPatch() throws Exception {
        // Initialize the database
        placeRepository.save(place).block();

        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();

        // Update the place using partial update
        Place partialUpdatedPlace = new Place();
        partialUpdatedPlace.setId(place.getId());

        partialUpdatedPlace
            .name(UPDATED_NAME)
            .numberOfSeats(UPDATED_NUMBER_OF_SEATS)
            .shortName(UPDATED_SHORT_NAME)
            .colorBackground(UPDATED_COLOR_BACKGROUND)
            .colorText(UPDATED_COLOR_TEXT)
            .description(UPDATED_DESCRIPTION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPlace.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPlace))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
        Place testPlace = placeList.get(placeList.size() - 1);
        assertThat(testPlace.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlace.getNumberOfSeats()).isEqualTo(UPDATED_NUMBER_OF_SEATS);
        assertThat(testPlace.getShortName()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testPlace.getColorBackground()).isEqualTo(UPDATED_COLOR_BACKGROUND);
        assertThat(testPlace.getColorText()).isEqualTo(UPDATED_COLOR_TEXT);
        assertThat(testPlace.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    void patchNonExistingPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();
        place.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, place.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();
        place.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPlace() throws Exception {
        int databaseSizeBeforeUpdate = placeRepository.findAll().collectList().block().size();
        place.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(place))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Place in the database
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePlace() {
        // Initialize the database
        placeRepository.save(place).block();

        int databaseSizeBeforeDelete = placeRepository.findAll().collectList().block().size();

        // Delete the place
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, place.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Place> placeList = placeRepository.findAll().collectList().block();
        assertThat(placeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
