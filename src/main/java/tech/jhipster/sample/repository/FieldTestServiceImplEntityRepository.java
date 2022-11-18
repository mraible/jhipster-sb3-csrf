package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.FieldTestServiceImplEntity;

/**
 * Spring Data MongoDB reactive repository for the FieldTestServiceImplEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestServiceImplEntityRepository extends ReactiveMongoRepository<FieldTestServiceImplEntity, String> {}
