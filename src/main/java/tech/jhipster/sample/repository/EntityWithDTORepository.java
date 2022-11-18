package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.EntityWithDTO;

/**
 * Spring Data MongoDB reactive repository for the EntityWithDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithDTORepository extends ReactiveMongoRepository<EntityWithDTO, String> {}
