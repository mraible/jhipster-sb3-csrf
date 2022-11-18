package tech.jhipster.sample.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tech.jhipster.sample.domain.EntityWithPaginationAndDTO} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EntityWithPaginationAndDTODTO implements Serializable {

    private String id;

    private String lea;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLea() {
        return lea;
    }

    public void setLea(String lea) {
        this.lea = lea;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntityWithPaginationAndDTODTO)) {
            return false;
        }

        EntityWithPaginationAndDTODTO entityWithPaginationAndDTODTO = (EntityWithPaginationAndDTODTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, entityWithPaginationAndDTODTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EntityWithPaginationAndDTODTO{" +
            "id='" + getId() + "'" +
            ", lea='" + getLea() + "'" +
            "}";
    }
}
