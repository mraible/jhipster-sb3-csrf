package tech.jhipster.sample.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tech.jhipster.sample.domain.EntityWithDTO} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithDTODTO implements Serializable {

    private String id;

    private String emma;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmma() {
        return emma;
    }

    public void setEmma(String emma) {
        this.emma = emma;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithDTODTO)) {
            return false;
        }

        EntityWithDTODTO entityWithDTODTO = (EntityWithDTODTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entityWithDTODTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithDTODTO{" +
            "id='" + getId() + "'" +
            ", emma='" + getEmma() + "'" +
            "}";
    }
}
