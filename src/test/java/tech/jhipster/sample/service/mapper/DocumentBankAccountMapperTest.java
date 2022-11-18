package tech.jhipster.sample.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DocumentBankAccountMapperTest {

    private DocumentBankAccountMapper documentBankAccountMapper;

    @BeforeEach
    public void setUp() {
        documentBankAccountMapper = new DocumentBankAccountMapperImpl();
    }
}
