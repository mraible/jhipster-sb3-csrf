package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.EntityWithServiceClassAndPagination;

/**
 * Spring Data MongoDB reactive repository for the EntityWithServiceClassAndPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceClassAndPaginationRepository
    extends ReactiveMongoRepository<EntityWithServiceClassAndPagination, String> {
    Flux<EntityWithServiceClassAndPagination> findAllBy(Pageable pageable);
}
