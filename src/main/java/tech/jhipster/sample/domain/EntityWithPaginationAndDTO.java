package tech.jhipster.sample.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A EntityWithPaginationAndDTO.
 */
@Document(collection = "entity_with_pagination_and_dto")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithPaginationAndDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("lea")
    private String lea;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public EntityWithPaginationAndDTO id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLea() {
        return this.lea;
    }

    public EntityWithPaginationAndDTO lea(String lea) {
        this.setLea(lea);
        return this;
    }

    public void setLea(String lea) {
        this.lea = lea;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithPaginationAndDTO)) {
            return false;
        }
        return id != null && id.equals(((EntityWithPaginationAndDTO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithPaginationAndDTO{" +
            "id=" + getId() +
            ", lea='" + getLea() + "'" +
            "}";
    }
}
