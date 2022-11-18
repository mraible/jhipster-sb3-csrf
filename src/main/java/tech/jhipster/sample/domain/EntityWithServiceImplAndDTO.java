package tech.jhipster.sample.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A EntityWithServiceImplAndDTO.
 */
@Document(collection = "entity_with_service_impl_and_dto")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithServiceImplAndDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("louis")
    private String louis;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public EntityWithServiceImplAndDTO id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLouis() {
        return this.louis;
    }

    public EntityWithServiceImplAndDTO louis(String louis) {
        this.setLouis(louis);
        return this;
    }

    public void setLouis(String louis) {
        this.louis = louis;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithServiceImplAndDTO)) {
            return false;
        }
        return id != null && id.equals(((EntityWithServiceImplAndDTO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithServiceImplAndDTO{" +
            "id=" + getId() +
            ", louis='" + getLouis() + "'" +
            "}";
    }
}
