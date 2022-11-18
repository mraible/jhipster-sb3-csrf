package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.EntityWithPaginationAndDTO;

/**
 * Spring Data MongoDB reactive repository for the EntityWithPaginationAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithPaginationAndDTORepository extends ReactiveMongoRepository<EntityWithPaginationAndDTO, String> {
    Flux<EntityWithPaginationAndDTO> findAllBy(Pageable pageable);
}
