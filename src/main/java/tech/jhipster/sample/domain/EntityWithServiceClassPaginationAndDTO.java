package tech.jhipster.sample.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A EntityWithServiceClassPaginationAndDTO.
 */
@Document(collection = "entity_with_service_class_pagination_and_dto")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithServiceClassPaginationAndDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("lena")
    private String lena;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public EntityWithServiceClassPaginationAndDTO id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLena() {
        return this.lena;
    }

    public EntityWithServiceClassPaginationAndDTO lena(String lena) {
        this.setLena(lena);
        return this;
    }

    public void setLena(String lena) {
        this.lena = lena;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithServiceClassPaginationAndDTO)) {
            return false;
        }
        return id != null && id.equals(((EntityWithServiceClassPaginationAndDTO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithServiceClassPaginationAndDTO{" +
            "id=" + getId() +
            ", lena='" + getLena() + "'" +
            "}";
    }
}
