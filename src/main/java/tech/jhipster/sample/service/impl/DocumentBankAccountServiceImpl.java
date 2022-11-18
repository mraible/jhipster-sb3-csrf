package tech.jhipster.sample.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.sample.domain.DocumentBankAccount;
import tech.jhipster.sample.repository.DocumentBankAccountRepository;
import tech.jhipster.sample.service.DocumentBankAccountService;
import tech.jhipster.sample.service.dto.DocumentBankAccountDTO;
import tech.jhipster.sample.service.mapper.DocumentBankAccountMapper;

/**
 * Service Implementation for managing {@link DocumentBankAccount}.
 */
@Service
public class DocumentBankAccountServiceImpl implements DocumentBankAccountService {

    private final Logger log = LoggerFactory.getLogger(DocumentBankAccountServiceImpl.class);

    private final DocumentBankAccountRepository documentBankAccountRepository;

    private final DocumentBankAccountMapper documentBankAccountMapper;

    public DocumentBankAccountServiceImpl(
        DocumentBankAccountRepository documentBankAccountRepository,
        DocumentBankAccountMapper documentBankAccountMapper
    ) {
        this.documentBankAccountRepository = documentBankAccountRepository;
        this.documentBankAccountMapper = documentBankAccountMapper;
    }

    @Override
    public Mono<DocumentBankAccountDTO> save(DocumentBankAccountDTO documentBankAccountDTO) {
        log.debug("Request to save DocumentBankAccount : {}", documentBankAccountDTO);
        return documentBankAccountRepository
            .save(documentBankAccountMapper.toEntity(documentBankAccountDTO))
            .map(documentBankAccountMapper::toDto);
    }

    @Override
    public Mono<DocumentBankAccountDTO> update(DocumentBankAccountDTO documentBankAccountDTO) {
        log.debug("Request to update DocumentBankAccount : {}", documentBankAccountDTO);
        return documentBankAccountRepository
            .save(documentBankAccountMapper.toEntity(documentBankAccountDTO))
            .map(documentBankAccountMapper::toDto);
    }

    @Override
    public Mono<DocumentBankAccountDTO> partialUpdate(DocumentBankAccountDTO documentBankAccountDTO) {
        log.debug("Request to partially update DocumentBankAccount : {}", documentBankAccountDTO);

        return documentBankAccountRepository
            .findById(documentBankAccountDTO.getId())
            .map(existingDocumentBankAccount -> {
                documentBankAccountMapper.partialUpdate(existingDocumentBankAccount, documentBankAccountDTO);

                return existingDocumentBankAccount;
            })
            .flatMap(documentBankAccountRepository::save)
            .map(documentBankAccountMapper::toDto);
    }

    @Override
    public Flux<DocumentBankAccountDTO> findAll() {
        log.debug("Request to get all DocumentBankAccounts");
        return documentBankAccountRepository.findAll().map(documentBankAccountMapper::toDto);
    }

    public Mono<Long> countAll() {
        return documentBankAccountRepository.count();
    }

    @Override
    public Mono<DocumentBankAccountDTO> findOne(String id) {
        log.debug("Request to get DocumentBankAccount : {}", id);
        return documentBankAccountRepository.findById(id).map(documentBankAccountMapper::toDto);
    }

    @Override
    public Mono<Void> delete(String id) {
        log.debug("Request to delete DocumentBankAccount : {}", id);
        return documentBankAccountRepository.deleteById(id);
    }
}
