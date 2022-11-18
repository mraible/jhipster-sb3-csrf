package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.EntityWithServiceImplPaginationAndDTO;

/**
 * Spring Data MongoDB reactive repository for the EntityWithServiceImplPaginationAndDTO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntityWithServiceImplPaginationAndDTORepository
    extends ReactiveMongoRepository<EntityWithServiceImplPaginationAndDTO, String> {
    Flux<EntityWithServiceImplPaginationAndDTO> findAllBy(Pageable pageable);
}
