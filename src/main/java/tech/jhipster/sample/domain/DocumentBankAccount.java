package tech.jhipster.sample.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import tech.jhipster.sample.domain.enumeration.BankAccountType;

/**
 * A DocumentBankAccount.
 */
@Document(collection = "document_bank_account")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DocumentBankAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @Field("bank_number")
    private Integer bankNumber;

    @Field("agency_number")
    private Long agencyNumber;

    @Field("last_operation_duration")
    private Float lastOperationDuration;

    @Field("mean_operation_duration")
    private Double meanOperationDuration;

    @NotNull(message = "must not be null")
    @Field("balance")
    private BigDecimal balance;

    @Field("opening_day")
    private LocalDate openingDay;

    @Field("last_operation_date")
    private Instant lastOperationDate;

    @Field("active")
    private Boolean active;

    @Field("account_type")
    private BankAccountType accountType;

    @Field("attachment")
    private byte[] attachment;

    @Field("attachment_content_type")
    private String attachmentContentType;

    @Field("description")
    private String description;

    @Field("embeddedOperation")
    @JsonIgnoreProperties(value = { "documentBankAccount" }, allowSetters = true)
    private Set<EmbeddedOperation> embeddedOperations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public DocumentBankAccount id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public DocumentBankAccount name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBankNumber() {
        return this.bankNumber;
    }

    public DocumentBankAccount bankNumber(Integer bankNumber) {
        this.setBankNumber(bankNumber);
        return this;
    }

    public void setBankNumber(Integer bankNumber) {
        this.bankNumber = bankNumber;
    }

    public Long getAgencyNumber() {
        return this.agencyNumber;
    }

    public DocumentBankAccount agencyNumber(Long agencyNumber) {
        this.setAgencyNumber(agencyNumber);
        return this;
    }

    public void setAgencyNumber(Long agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public Float getLastOperationDuration() {
        return this.lastOperationDuration;
    }

    public DocumentBankAccount lastOperationDuration(Float lastOperationDuration) {
        this.setLastOperationDuration(lastOperationDuration);
        return this;
    }

    public void setLastOperationDuration(Float lastOperationDuration) {
        this.lastOperationDuration = lastOperationDuration;
    }

    public Double getMeanOperationDuration() {
        return this.meanOperationDuration;
    }

    public DocumentBankAccount meanOperationDuration(Double meanOperationDuration) {
        this.setMeanOperationDuration(meanOperationDuration);
        return this;
    }

    public void setMeanOperationDuration(Double meanOperationDuration) {
        this.meanOperationDuration = meanOperationDuration;
    }

    public BigDecimal getBalance() {
        return this.balance;
    }

    public DocumentBankAccount balance(BigDecimal balance) {
        this.setBalance(balance);
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDate getOpeningDay() {
        return this.openingDay;
    }

    public DocumentBankAccount openingDay(LocalDate openingDay) {
        this.setOpeningDay(openingDay);
        return this;
    }

    public void setOpeningDay(LocalDate openingDay) {
        this.openingDay = openingDay;
    }

    public Instant getLastOperationDate() {
        return this.lastOperationDate;
    }

    public DocumentBankAccount lastOperationDate(Instant lastOperationDate) {
        this.setLastOperationDate(lastOperationDate);
        return this;
    }

    public void setLastOperationDate(Instant lastOperationDate) {
        this.lastOperationDate = lastOperationDate;
    }

    public Boolean getActive() {
        return this.active;
    }

    public DocumentBankAccount active(Boolean active) {
        this.setActive(active);
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public BankAccountType getAccountType() {
        return this.accountType;
    }

    public DocumentBankAccount accountType(BankAccountType accountType) {
        this.setAccountType(accountType);
        return this;
    }

    public void setAccountType(BankAccountType accountType) {
        this.accountType = accountType;
    }

    public byte[] getAttachment() {
        return this.attachment;
    }

    public DocumentBankAccount attachment(byte[] attachment) {
        this.setAttachment(attachment);
        return this;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return this.attachmentContentType;
    }

    public DocumentBankAccount attachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
        return this;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getDescription() {
        return this.description;
    }

    public DocumentBankAccount description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<EmbeddedOperation> getEmbeddedOperations() {
        return this.embeddedOperations;
    }

    public void setEmbeddedOperations(Set<EmbeddedOperation> embeddedOperations) {
        if (this.embeddedOperations != null) {
            this.embeddedOperations.forEach(i -> i.setDocumentBankAccount(null));
        }
        if (embeddedOperations != null) {
            embeddedOperations.forEach(i -> i.setDocumentBankAccount(this));
        }
        this.embeddedOperations = embeddedOperations;
    }

    public DocumentBankAccount embeddedOperations(Set<EmbeddedOperation> embeddedOperations) {
        this.setEmbeddedOperations(embeddedOperations);
        return this;
    }

    public DocumentBankAccount addEmbeddedOperation(EmbeddedOperation embeddedOperation) {
        this.embeddedOperations.add(embeddedOperation);
        return this;
    }

    public DocumentBankAccount removeEmbeddedOperation(EmbeddedOperation embeddedOperation) {
        this.embeddedOperations.remove(embeddedOperation);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DocumentBankAccount)) {
            return false;
        }
        return id != null && id.equals(((DocumentBankAccount) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DocumentBankAccount{" +
            "id=" + getId() +
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
            ", attachmentContentType='" + getAttachmentContentType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
