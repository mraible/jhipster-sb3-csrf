package tech.jhipster.sample.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class EntityWithServiceClassPaginationAndDTODTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceClassPaginationAndDTODTO.class);
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO1 = new EntityWithServiceClassPaginationAndDTODTO();
        entityWithServiceClassPaginationAndDTODTO1.setId("id1");
        EntityWithServiceClassPaginationAndDTODTO entityWithServiceClassPaginationAndDTODTO2 = new EntityWithServiceClassPaginationAndDTODTO();
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTODTO2);
        entityWithServiceClassPaginationAndDTODTO2.setId(entityWithServiceClassPaginationAndDTODTO1.getId());
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isEqualTo(entityWithServiceClassPaginationAndDTODTO2);
        entityWithServiceClassPaginationAndDTODTO2.setId("id2");
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTODTO2);
        entityWithServiceClassPaginationAndDTODTO1.setId(null);
        assertThat(entityWithServiceClassPaginationAndDTODTO1).isNotEqualTo(entityWithServiceClassPaginationAndDTODTO2);
    }
}
