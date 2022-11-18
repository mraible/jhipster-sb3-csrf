package tech.jhipster.sample.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import tech.jhipster.sample.domain.FieldTestInfiniteScrollEntity;

/**
 * Spring Data MongoDB reactive repository for the FieldTestInfiniteScrollEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldTestInfiniteScrollEntityRepository extends ReactiveMongoRepository<FieldTestInfiniteScrollEntity, String> {
    Flux<FieldTestInfiniteScrollEntity> findAllBy(Pageable pageable);
}
