package tech.jhipster.sample.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link tech.jhipster.sample.domain.EmbeddedOperation} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EmbeddedOperationDTO implements Serializable {

    @NotNull(message = "must not be null")
    private Instant date;

    private String description;

    @NotNull(message = "must not be null")
    private BigDecimal amount;

    private DocumentBankAccountDTO documentBankAccount;

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public DocumentBankAccountDTO getDocumentBankAccount() {
        return documentBankAccount;
    }

    public void setDocumentBankAccount(DocumentBankAccountDTO documentBankAccount) {
        this.documentBankAccount = documentBankAccount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmbeddedOperationDTO)) {
            return false;
        }

        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmbeddedOperationDTO{" +
            "date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", amount=" + getAmount() +
            ", documentBankAccount=" + getDocumentBankAccount() +
            "}";
    }
}
