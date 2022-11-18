package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.EntityWithServiceImplAndDTO;

/**
 * Spring Data MongoDB reactive repository for the EntityWithServiceImplAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplAndDTORepository extends ReactiveMongoRepository<EntityWithServiceImplAndDTO, String> {}
