package tech.jhipster.sample.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import tech.jhipster.sample.domain.enumeration.BankAccountType;

/**
 * A DTO for the {@link tech.jhipster.sample.domain.DocumentBankAccount} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DocumentBankAccountDTO implements Serializable {

    private String id;

    @NotNull(message = "must not be null")
    private String name;

    private Integer bankNumber;

    private Long agencyNumber;

    private Float lastOperationDuration;

    private Double meanOperationDuration;

    @NotNull(message = "must not be null")
    private BigDecimal balance;

    private LocalDate openingDay;

    private Instant lastOperationDate;

    private Boolean active;

    private BankAccountType accountType;

    private byte[] attachment;

    private String attachmentContentType;
    private String description;

    private Set<EmbeddedOperationDTO> embeddedOperations = new HashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBankNumber() {
        return bankNumber;
    }

    public void setBankNumber(Integer bankNumber) {
        this.bankNumber = bankNumber;
    }

    public Long getAgencyNumber() {
        return agencyNumber;
    }

    public void setAgencyNumber(Long agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public Float getLastOperationDuration() {
        return lastOperationDuration;
    }

    public void setLastOperationDuration(Float lastOperationDuration) {
        this.lastOperationDuration = lastOperationDuration;
    }

    public Double getMeanOperationDuration() {
        return meanOperationDuration;
    }

    public void setMeanOperationDuration(Double meanOperationDuration) {
        this.meanOperationDuration = meanOperationDuration;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDate getOpeningDay() {
        return openingDay;
    }

    public void setOpeningDay(LocalDate openingDay) {
        this.openingDay = openingDay;
    }

    public Instant getLastOperationDate() {
        return lastOperationDate;
    }

    public void setLastOperationDate(Instant lastOperationDate) {
        this.lastOperationDate = lastOperationDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public BankAccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(BankAccountType accountType) {
        this.accountType = accountType;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return attachmentContentType;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<EmbeddedOperationDTO> getEmbeddedOperations() {
        return embeddedOperations;
    }

    public void setEmbeddedOperations(Set<EmbeddedOperationDTO> embeddedOperations) {
        this.embeddedOperations = embeddedOperations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentBankAccountDTO)) {
            return false;
        }

        DocumentBankAccountDTO documentBankAccountDTO = (DocumentBankAccountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, documentBankAccountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DocumentBankAccountDTO{" +
            "id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", bankNumber=" + getBankNumber() +
            ", agencyNumber=" + getAgencyNumber() +
            ", lastOperationDuration=" + getLastOperationDuration() +
            ", meanOperationDuration=" + getMeanOperationDuration() +
            ", balance=" + getBalance() +
            ", openingDay='" + getOpeningDay() + "'" +
            ", lastOperationDate='" + getLastOperationDate() + "'" +
            ", active='" + getActive() + "'" +
            ", accountType='" + getAccountType() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", description='" + getDescription() + "'" +
            ", embeddedOperations=" + getEmbeddedOperations() +
            "}";
    }
}
