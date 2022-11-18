package tech.jhipster.sample.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.domain.Place;
import tech.jhipster.sample.repository.PlaceRepository;
import tech.jhipster.sample.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link tech.jhipster.sample.domain.Place}.
 */
@RestController
@RequestMapping("/api")
public class PlaceResource {

    private final Logger log = LoggerFactory.getLogger(PlaceResource.class);

    private static final String ENTITY_NAME = "testRootPlace";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaceRepository placeRepository;

    public PlaceResource(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    /**
     * {@code POST  /places} : Create a new place.
     *
     * @param place the place to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new place, or with status {@code 400 (Bad Request)} if the place has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/places")
    public Mono<ResponseEntity<Place>> createPlace(@Valid @RequestBody Place place) throws URISyntaxException {
        log.debug("REST request to save Place : {}", place);
        if (place.getId() != null) {
            throw new BadRequestAlertException("A new place cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return placeRepository
            .save(place)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/places/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /places/:id} : Updates an existing place.
     *
     * @param id the id of the place to save.
     * @param place the place to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated place,
     * or with status {@code 400 (Bad Request)} if the place is not valid,
     * or with status {@code 500 (Internal Server Error)} if the place couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/places/{id}")
    public Mono<ResponseEntity<Place>> updatePlace(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Place place
    ) throws URISyntaxException {
        log.debug("REST request to update Place : {}, {}", id, place);
        if (place.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, place.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return placeRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return placeRepository
                    .save(place)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /places/:id} : Partial updates given fields of an existing place, field will ignore if it is null
     *
     * @param id the id of the place to save.
     * @param place the place to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated place,
     * or with status {@code 400 (Bad Request)} if the place is not valid,
     * or with status {@code 404 (Not Found)} if the place is not found,
     * or with status {@code 500 (Internal Server Error)} if the place couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/places/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Place>> partialUpdatePlace(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Place place
    ) throws URISyntaxException {
        log.debug("REST request to partial update Place partially : {}, {}", id, place);
        if (place.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, place.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return placeRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Place> result = placeRepository
                    .findById(place.getId())
                    .map(existingPlace -> {
                        if (place.getName() != null) {
                            existingPlace.setName(place.getName());
                        }
                        if (place.getNumberOfSeats() != null) {
                            existingPlace.setNumberOfSeats(place.getNumberOfSeats());
                        }
                        if (place.getShortName() != null) {
                            existingPlace.setShortName(place.getShortName());
                        }
                        if (place.getColorBackground() != null) {
                            existingPlace.setColorBackground(place.getColorBackground());
                        }
                        if (place.getColorText() != null) {
                            existingPlace.setColorText(place.getColorText());
                        }
                        if (place.getDescription() != null) {
                            existingPlace.setDescription(place.getDescription());
                        }

                        return existingPlace;
                    })
                    .flatMap(placeRepository::save);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /places} : get all the places.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of places in body.
     */
    @GetMapping("/places")
    public Mono<ResponseEntity<List<Place>>> getAllPlaces(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of Places");
        return placeRepository
            .count()
            .zipWith(placeRepository.findAllBy(pageable).collectList())
            .map(countWithEntities ->
                ResponseEntity
                    .ok()
                    .headers(
                        PaginationUtil.generatePaginationHttpHeaders(
                            UriComponentsBuilder.fromHttpRequest(request),
                            new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                        )
                    )
                    .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /places/:id} : get the "id" place.
     *
     * @param id the id of the place to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the place, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/places/{id}")
    public Mono<ResponseEntity<Place>> getPlace(@PathVariable String id) {
        log.debug("REST request to get Place : {}", id);
        Mono<Place> place = placeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(place);
    }

    /**
     * {@code DELETE  /places/:id} : delete the "id" place.
     *
     * @param id the id of the place to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/places/{id}")
    public Mono<ResponseEntity<Void>> deletePlace(@PathVariable String id) {
        log.debug("REST request to delete Place : {}", id);
        return placeRepository
            .deleteById(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
