package tech.jhipster.sample.service;

import java.util.List;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.service.dto.DocumentBankAccountDTO;

/**
 * Service Interface for managing {@link tech.jhipster.sample.domain.DocumentBankAccount}.
 */
public interface DocumentBankAccountService {
    /**
     * Save a documentBankAccount.
     *
     * @param documentBankAccountDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<DocumentBankAccountDTO> save(DocumentBankAccountDTO documentBankAccountDTO);

    /**
     * Updates a documentBankAccount.
     *
     * @param documentBankAccountDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<DocumentBankAccountDTO> update(DocumentBankAccountDTO documentBankAccountDTO);

    /**
     * Partially updates a documentBankAccount.
     *
     * @param documentBankAccountDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<DocumentBankAccountDTO> partialUpdate(DocumentBankAccountDTO documentBankAccountDTO);

    /**
     * Get all the documentBankAccounts.
     *
     * @return the list of entities.
     */
    Flux<DocumentBankAccountDTO> findAll();

    /**
     * Returns the number of documentBankAccounts available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" documentBankAccount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<DocumentBankAccountDTO> findOne(String id);

    /**
     * Delete the "id" documentBankAccount.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(String id);
}
