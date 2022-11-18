package tech.jhipster.sample.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class EntityWithServiceImplPaginationAndDTOTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntityWithServiceImplPaginationAndDTO.class);
        EntityWithServiceImplPaginationAndDTO entityWithServiceImplPaginationAndDTO1 = new EntityWithServiceImplPaginationAndDTO();
        entityWithServiceImplPaginationAndDTO1.setId("id1");
        EntityWithServiceImplPaginationAndDTO entityWithServiceImplPaginationAndDTO2 = new EntityWithServiceImplPaginationAndDTO();
        entityWithServiceImplPaginationAndDTO2.setId(entityWithServiceImplPaginationAndDTO1.getId());
        assertThat(entityWithServiceImplPaginationAndDTO1).isEqualTo(entityWithServiceImplPaginationAndDTO2);
        entityWithServiceImplPaginationAndDTO2.setId("id2");
        assertThat(entityWithServiceImplPaginationAndDTO1).isNotEqualTo(entityWithServiceImplPaginationAndDTO2);
        entityWithServiceImplPaginationAndDTO1.setId(null);
        assertThat(entityWithServiceImplPaginationAndDTO1).isNotEqualTo(entityWithServiceImplPaginationAndDTO2);
    }
}
