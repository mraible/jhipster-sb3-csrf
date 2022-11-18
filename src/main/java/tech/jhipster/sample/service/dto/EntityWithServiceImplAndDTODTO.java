package tech.jhipster.sample.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tech.jhipster.sample.domain.EntityWithServiceImplAndDTO} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithServiceImplAndDTODTO implements Serializable {

    private String id;

    private String louis;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLouis() {
        return louis;
    }

    public void setLouis(String louis) {
        this.louis = louis;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithServiceImplAndDTODTO)) {
            return false;
        }

        EntityWithServiceImplAndDTODTO entityWithServiceImplAndDTODTO = (EntityWithServiceImplAndDTODTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entityWithServiceImplAndDTODTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithServiceImplAndDTODTO{" +
            "id='" + getId() + "'" +
            ", louis='" + getLouis() + "'" +
            "}";
    }
}
