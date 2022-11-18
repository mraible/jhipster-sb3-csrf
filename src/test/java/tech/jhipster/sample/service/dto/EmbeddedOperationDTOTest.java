package tech.jhipster.sample.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class EmbeddedOperationDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmbeddedOperationDTO.class);
    }
}
