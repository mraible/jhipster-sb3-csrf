package tech.jhipster.sample.service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.domain.FieldTestMapstructAndServiceClassEntity;
import tech.jhipster.sample.repository.FieldTestMapstructAndServiceClassEntityRepository;
import tech.jhipster.sample.service.dto.FieldTestMapstructAndServiceClassEntityDTO;
import tech.jhipster.sample.service.mapper.FieldTestMapstructAndServiceClassEntityMapper;

/**
 * Service Implementation for managing {@link FieldTestMapstructAndServiceClassEntity}.
 */
@Service
public class FieldTestMapstructAndServiceClassEntityService {

    private final Logger log = LoggerFactory.getLogger(FieldTestMapstructAndServiceClassEntityService.class);

    private final FieldTestMapstructAndServiceClassEntityRepository fieldTestMapstructAndServiceClassEntityRepository;

    private final FieldTestMapstructAndServiceClassEntityMapper fieldTestMapstructAndServiceClassEntityMapper;

    public FieldTestMapstructAndServiceClassEntityService(
        FieldTestMapstructAndServiceClassEntityRepository fieldTestMapstructAndServiceClassEntityRepository,
        FieldTestMapstructAndServiceClassEntityMapper fieldTestMapstructAndServiceClassEntityMapper
    ) {
        this.fieldTestMapstructAndServiceClassEntityRepository = fieldTestMapstructAndServiceClassEntityRepository;
        this.fieldTestMapstructAndServiceClassEntityMapper = fieldTestMapstructAndServiceClassEntityMapper;
    }

    /**
     * Save a fieldTestMapstructAndServiceClassEntity.
     *
     * @param fieldTestMapstructAndServiceClassEntityDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<FieldTestMapstructAndServiceClassEntityDTO> save(
        FieldTestMapstructAndServiceClassEntityDTO fieldTestMapstructAndServiceClassEntityDTO
    ) {
        log.debug("Request to save FieldTestMapstructAndServiceClassEntity : {}", fieldTestMapstructAndServiceClassEntityDTO);
        return fieldTestMapstructAndServiceClassEntityRepository
            .save(fieldTestMapstructAndServiceClassEntityMapper.toEntity(fieldTestMapstructAndServiceClassEntityDTO))
            .map(fieldTestMapstructAndServiceClassEntityMapper::toDto);
    }

    /**
     * Update a fieldTestMapstructAndServiceClassEntity.
     *
     * @param fieldTestMapstructAndServiceClassEntityDTO the entity to save.
     * @return the persisted entity.
     */
    public Mono<FieldTestMapstructAndServiceClassEntityDTO> update(
        FieldTestMapstructAndServiceClassEntityDTO fieldTestMapstructAndServiceClassEntityDTO
    ) {
        log.debug("Request to update FieldTestMapstructAndServiceClassEntity : {}", fieldTestMapstructAndServiceClassEntityDTO);
        return fieldTestMapstructAndServiceClassEntityRepository
            .save(fieldTestMapstructAndServiceClassEntityMapper.toEntity(fieldTestMapstructAndServiceClassEntityDTO))
            .map(fieldTestMapstructAndServiceClassEntityMapper::toDto);
    }

    /**
     * Partially update a fieldTestMapstructAndServiceClassEntity.
     *
     * @param fieldTestMapstructAndServiceClassEntityDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<FieldTestMapstructAndServiceClassEntityDTO> partialUpdate(
        FieldTestMapstructAndServiceClassEntityDTO fieldTestMapstructAndServiceClassEntityDTO
    ) {
        log.debug("Request to partially update FieldTestMapstructAndServiceClassEntity : {}", fieldTestMapstructAndServiceClassEntityDTO);

        return fieldTestMapstructAndServiceClassEntityRepository
            .findById(fieldTestMapstructAndServiceClassEntityDTO.getId())
            .map(existingFieldTestMapstructAndServiceClassEntity -> {
                fieldTestMapstructAndServiceClassEntityMapper.partialUpdate(
                    existingFieldTestMapstructAndServiceClassEntity,
                    fieldTestMapstructAndServiceClassEntityDTO
                );

                return existingFieldTestMapstructAndServiceClassEntity;
            })
            .flatMap(fieldTestMapstructAndServiceClassEntityRepository::save)
            .map(fieldTestMapstructAndServiceClassEntityMapper::toDto);
    }

    /**
     * Get all the fieldTestMapstructAndServiceClassEntities.
     *
     * @return the list of entities.
     */
    public Flux<FieldTestMapstructAndServiceClassEntityDTO> findAll() {
        log.debug("Request to get all FieldTestMapstructAndServiceClassEntities");
        return fieldTestMapstructAndServiceClassEntityRepository.findAll().map(fieldTestMapstructAndServiceClassEntityMapper::toDto);
    }

    /**
     * Returns the number of fieldTestMapstructAndServiceClassEntities available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return fieldTestMapstructAndServiceClassEntityRepository.count();
    }

    /**
     * Get one fieldTestMapstructAndServiceClassEntity by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<FieldTestMapstructAndServiceClassEntityDTO> findOne(String id) {
        log.debug("Request to get FieldTestMapstructAndServiceClassEntity : {}", id);
        return fieldTestMapstructAndServiceClassEntityRepository.findById(id).map(fieldTestMapstructAndServiceClassEntityMapper::toDto);
    }

    /**
     * Delete the fieldTestMapstructAndServiceClassEntity by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete FieldTestMapstructAndServiceClassEntity : {}", id);
        return fieldTestMapstructAndServiceClassEntityRepository.deleteById(id);
    }
}
