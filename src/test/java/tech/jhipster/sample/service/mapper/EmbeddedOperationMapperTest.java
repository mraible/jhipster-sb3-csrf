package tech.jhipster.sample.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EmbeddedOperationMapperTest {

    private EmbeddedOperationMapper embeddedOperationMapper;

    @BeforeEach
    public void setUp() {
        embeddedOperationMapper = new EmbeddedOperationMapperImpl();
    }
}
