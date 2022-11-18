package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.FieldTestMapstructAndServiceClassEntity;

/**
 * Spring Data MongoDB reactive repository for the FieldTestMapstructAndServiceClassEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestMapstructAndServiceClassEntityRepository
    extends ReactiveMongoRepository<FieldTestMapstructAndServiceClassEntity, String> {}
