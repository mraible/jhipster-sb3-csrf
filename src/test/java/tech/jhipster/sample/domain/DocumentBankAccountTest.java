package tech.jhipster.sample.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.jhipster.sample.web.rest.TestUtil;

class DocumentBankAccountTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentBankAccount.class);
        DocumentBankAccount documentBankAccount1 = new DocumentBankAccount();
        documentBankAccount1.setId("id1");
        DocumentBankAccount documentBankAccount2 = new DocumentBankAccount();
        documentBankAccount2.setId(documentBankAccount1.getId());
        assertThat(documentBankAccount1).isEqualTo(documentBankAccount2);
        documentBankAccount2.setId("id2");
        assertThat(documentBankAccount1).isNotEqualTo(documentBankAccount2);
        documentBankAccount1.setId(null);
        assertThat(documentBankAccount1).isNotEqualTo(documentBankAccount2);
    }
}
