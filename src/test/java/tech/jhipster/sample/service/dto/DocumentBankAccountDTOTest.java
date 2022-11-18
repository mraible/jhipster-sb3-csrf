package tech.jhipster.sample.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class DocumentBankAccountDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentBankAccountDTO.class);
        DocumentBankAccountDTO documentBankAccountDTO1 = new DocumentBankAccountDTO();
        documentBankAccountDTO1.setId("id1");
        DocumentBankAccountDTO documentBankAccountDTO2 = new DocumentBankAccountDTO();
        assertThat(documentBankAccountDTO1).isNotEqualTo(documentBankAccountDTO2);
        documentBankAccountDTO2.setId(documentBankAccountDTO1.getId());
        assertThat(documentBankAccountDTO1).isEqualTo(documentBankAccountDTO2);
        documentBankAccountDTO2.setId("id2");
        assertThat(documentBankAccountDTO1).isNotEqualTo(documentBankAccountDTO2);
        documentBankAccountDTO1.setId(null);
        assertThat(documentBankAccountDTO1).isNotEqualTo(documentBankAccountDTO2);
    }
}
