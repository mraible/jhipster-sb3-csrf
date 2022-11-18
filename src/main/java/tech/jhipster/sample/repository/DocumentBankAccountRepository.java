package tech.jhipster.sample.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import tech.jhipster.sample.domain.DocumentBankAccount;

/**
 * Spring Data MongoDB reactive repository for the DocumentBankAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentBankAccountRepository extends ReactiveMongoRepository<DocumentBankAccount, String> {}
