package tech.jhipster.sample.service.mapper;

import org.mapstruct.*;
import tech.jhipster.sample.domain.DocumentBankAccount;
import tech.jhipster.sample.service.dto.DocumentBankAccountDTO;

/**
 * Mapper for the entity {@link DocumentBankAccount} and its DTO {@link DocumentBankAccountDTO}.
 */
@Mapper(componentModel = "spring")
public interface DocumentBankAccountMapper extends EntityMapper<DocumentBankAccountDTO, DocumentBankAccount> {}
