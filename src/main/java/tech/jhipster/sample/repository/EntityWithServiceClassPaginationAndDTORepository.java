package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.EntityWithServiceClassPaginationAndDTO;

/**
 * Spring Data MongoDB reactive repository for the EntityWithServiceClassPaginationAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceClassPaginationAndDTORepository
    extends ReactiveMongoRepository<EntityWithServiceClassPaginationAndDTO, String> {
    Flux<EntityWithServiceClassPaginationAndDTO> findAllBy(Pageable pageable);
}
