package tech.jhipster.sample.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class EmbeddedOperationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmbeddedOperation.class);
    }
}
