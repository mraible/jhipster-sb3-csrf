package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.FieldTestPaginationEntity;

/**
 * Spring Data MongoDB reactive repository for the FieldTestPaginationEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestPaginationEntityRepository extends ReactiveMongoRepository<FieldTestPaginationEntity, String> {
    Flux<FieldTestPaginationEntity> findAllBy(Pageable pageable);
}
