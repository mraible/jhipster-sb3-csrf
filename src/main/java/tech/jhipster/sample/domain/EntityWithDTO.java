package tech.jhipster.sample.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A EntityWithDTO.
 */
@Document(collection = "entity_with_dto")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("emma")
    private String emma;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public EntityWithDTO id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmma() {
        return this.emma;
    }

    public EntityWithDTO emma(String emma) {
        this.setEmma(emma);
        return this;
    }

    public void setEmma(String emma) {
        this.emma = emma;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithDTO)) {
            return false;
        }
        return id != null && id.equals(((EntityWithDTO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithDTO{" +
            "id=" + getId() +
            ", emma='" + getEmma() + "'" +
            "}";
    }
}
