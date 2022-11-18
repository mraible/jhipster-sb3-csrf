package tech.jhipster.sample.domain;

import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A EntityWithServiceImplPaginationAndDTO.
 */
@Document(collection = "entity_with_service_impl_pagination_and_dto")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithServiceImplPaginationAndDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("theo")
    private String theo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public EntityWithServiceImplPaginationAndDTO id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTheo() {
        return this.theo;
    }

    public EntityWithServiceImplPaginationAndDTO theo(String theo) {
        this.setTheo(theo);
        return this;
    }

    public void setTheo(String theo) {
        this.theo = theo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithServiceImplPaginationAndDTO)) {
            return false;
        }
        return id != null && id.equals(((EntityWithServiceImplPaginationAndDTO) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithServiceImplPaginationAndDTO{" +
            "id=" + getId() +
            ", theo='" + getTheo() + "'" +
            "}";
    }
}
