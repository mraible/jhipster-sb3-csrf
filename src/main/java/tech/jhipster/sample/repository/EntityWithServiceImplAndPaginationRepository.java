package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.EntityWithServiceImplAndPagination;

/**
 * Spring Data MongoDB reactive repository for the EntityWithServiceImplAndPagination entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplAndPaginationRepository extends ReactiveMongoRepository<EntityWithServiceImplAndPagination, String> {
    Flux<EntityWithServiceImplAndPagination> findAllBy(Pageable pageable);
}
