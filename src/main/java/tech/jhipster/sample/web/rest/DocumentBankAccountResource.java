package tech.jhipster.sample.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.repository.DocumentBankAccountRepository;
import tech.jhipster.sample.service.DocumentBankAccountService;
import tech.jhipster.sample.service.dto.DocumentBankAccountDTO;
import tech.jhipster.sample.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link tech.jhipster.sample.domain.DocumentBankAccount}.
 */
@RestController
@RequestMapping("/api")
public class DocumentBankAccountResource {

    private final Logger log = LoggerFactory.getLogger(DocumentBankAccountResource.class);

    private static final String ENTITY_NAME = "documentBankAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentBankAccountService documentBankAccountService;

    private final DocumentBankAccountRepository documentBankAccountRepository;

    public DocumentBankAccountResource(
        DocumentBankAccountService documentBankAccountService,
        DocumentBankAccountRepository documentBankAccountRepository
    ) {
        this.documentBankAccountService = documentBankAccountService;
        this.documentBankAccountRepository = documentBankAccountRepository;
    }

    /**
     * {@code POST  /document-bank-accounts} : Create a new documentBankAccount.
     *
     * @param documentBankAccountDTO the documentBankAccountDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentBankAccountDTO, or with status {@code 400 (Bad Request)} if the documentBankAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-bank-accounts")
    public Mono<ResponseEntity<DocumentBankAccountDTO>> createDocumentBankAccount(
        @Valid @RequestBody DocumentBankAccountDTO documentBankAccountDTO
    ) throws URISyntaxException {
        log.debug("REST request to save DocumentBankAccount : {}", documentBankAccountDTO);
        if (documentBankAccountDTO.getId() != null) {
            throw new BadRequestAlertException("A new documentBankAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return documentBankAccountService
            .save(documentBankAccountDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/document-bank-accounts/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /document-bank-accounts/:id} : Updates an existing documentBankAccount.
     *
     * @param id the id of the documentBankAccountDTO to save.
     * @param documentBankAccountDTO the documentBankAccountDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentBankAccountDTO,
     * or with status {@code 400 (Bad Request)} if the documentBankAccountDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentBankAccountDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-bank-accounts/{id}")
    public Mono<ResponseEntity<DocumentBankAccountDTO>> updateDocumentBankAccount(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody DocumentBankAccountDTO documentBankAccountDTO
    ) throws URISyntaxException {
        log.debug("REST request to update DocumentBankAccount : {}, {}", id, documentBankAccountDTO);
        if (documentBankAccountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documentBankAccountDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return documentBankAccountRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return documentBankAccountService
                    .update(documentBankAccountDTO)
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
     * {@code PATCH  /document-bank-accounts/:id} : Partial updates given fields of an existing documentBankAccount, field will ignore if it is null
     *
     * @param id the id of the documentBankAccountDTO to save.
     * @param documentBankAccountDTO the documentBankAccountDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentBankAccountDTO,
     * or with status {@code 400 (Bad Request)} if the documentBankAccountDTO is not valid,
     * or with status {@code 404 (Not Found)} if the documentBankAccountDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the documentBankAccountDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/document-bank-accounts/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<DocumentBankAccountDTO>> partialUpdateDocumentBankAccount(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody DocumentBankAccountDTO documentBankAccountDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update DocumentBankAccount partially : {}, {}", id, documentBankAccountDTO);
        if (documentBankAccountDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documentBankAccountDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return documentBankAccountRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<DocumentBankAccountDTO> result = documentBankAccountService.partialUpdate(documentBankAccountDTO);

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
     * {@code GET  /document-bank-accounts} : get all the documentBankAccounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentBankAccounts in body.
     */
    @GetMapping("/document-bank-accounts")
    public Mono<List<DocumentBankAccountDTO>> getAllDocumentBankAccounts() {
        log.debug("REST request to get all DocumentBankAccounts");
        return documentBankAccountService.findAll().collectList();
    }

    /**
     * {@code GET  /document-bank-accounts} : get all the documentBankAccounts as a stream.
     * @return the {@link Flux} of documentBankAccounts.
     */
    @GetMapping(value = "/document-bank-accounts", produces = MediaType.APPLICATION_NDJSON_VALUE)
    public Flux<DocumentBankAccountDTO> getAllDocumentBankAccountsAsStream() {
        log.debug("REST request to get all DocumentBankAccounts as a stream");
        return documentBankAccountService.findAll();
    }

    /**
     * {@code GET  /document-bank-accounts/:id} : get the "id" documentBankAccount.
     *
     * @param id the id of the documentBankAccountDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentBankAccountDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-bank-accounts/{id}")
    public Mono<ResponseEntity<DocumentBankAccountDTO>> getDocumentBankAccount(@PathVariable String id) {
        log.debug("REST request to get DocumentBankAccount : {}", id);
        Mono<DocumentBankAccountDTO> documentBankAccountDTO = documentBankAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(documentBankAccountDTO);
    }

    /**
     * {@code DELETE  /document-bank-accounts/:id} : delete the "id" documentBankAccount.
     *
     * @param id the id of the documentBankAccountDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-bank-accounts/{id}")
    public Mono<ResponseEntity<Void>> deleteDocumentBankAccount(@PathVariable String id) {
        log.debug("REST request to delete DocumentBankAccount : {}", id);
        return documentBankAccountService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build()
                )
            );
    }
}
