package tech.jhipster.sample.service.mapper;

import org.mapstruct.*;
import tech.jhipster.sample.domain.DocumentBankAccount;
import tech.jhipster.sample.domain.EmbeddedOperation;
import tech.jhipster.sample.service.dto.DocumentBankAccountDTO;
import tech.jhipster.sample.service.dto.EmbeddedOperationDTO;

/**
 * Mapper for the entity {@link EmbeddedOperation} and its DTO {@link EmbeddedOperationDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmbeddedOperationMapper extends EntityMapper<EmbeddedOperationDTO, EmbeddedOperation> {}
