package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.FieldTestEntity;

/**
 * Spring Data MongoDB reactive repository for the FieldTestEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestEntityRepository extends ReactiveMongoRepository<FieldTestEntity, String> {}
