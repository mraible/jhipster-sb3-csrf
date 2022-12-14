package tech.jhipster.sample.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Place.
 */
@Document(collection = "place")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull(message = "must not be null")
    @Field("name")
    private String name;

    @Field("number_of_seats")
    private Long numberOfSeats;

    @Field("short_name")
    private String shortName;

    @Field("color_background")
    private String colorBackground;

    @Field("color_text")
    private String colorText;

    @Field("description")
    private String description;

    @Field("preferredDivisions")
    @JsonIgnoreProperties(value = { "divisionsPlaces", "preferredPlaces" }, allowSetters = true)
    private Set<Division> preferredDivisions = new HashSet<>();

    @Field("owner")
    @JsonIgnoreProperties(value = { "divisionsPlaces", "preferredPlaces" }, allowSetters = true)
    private Division owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Place id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Place name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getNumberOfSeats() {
        return this.numberOfSeats;
    }

    public Place numberOfSeats(Long numberOfSeats) {
        this.setNumberOfSeats(numberOfSeats);
        return this;
    }

    public void setNumberOfSeats(Long numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public String getShortName() {
        return this.shortName;
    }

    public Place shortName(String shortName) {
        this.setShortName(shortName);
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getColorBackground() {
        return this.colorBackground;
    }

    public Place colorBackground(String colorBackground) {
        this.setColorBackground(colorBackground);
        return this;
    }

    public void setColorBackground(String colorBackground) {
        this.colorBackground = colorBackground;
    }

    public String getColorText() {
        return this.colorText;
    }

    public Place colorText(String colorText) {
        this.setColorText(colorText);
        return this;
    }

    public void setColorText(String colorText) {
        this.colorText = colorText;
    }

    public String getDescription() {
        return this.description;
    }

    public Place description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Division> getPreferredDivisions() {
        return this.preferredDivisions;
    }

    public void setPreferredDivisions(Set<Division> divisions) {
        this.preferredDivisions = divisions;
    }

    public Place preferredDivisions(Set<Division> divisions) {
        this.setPreferredDivisions(divisions);
        return this;
    }

    public Place addPreferredDivision(Division division) {
        this.preferredDivisions.add(division);
        division.getPreferredPlaces().add(this);
        return this;
    }

    public Place removePreferredDivision(Division division) {
        this.preferredDivisions.remove(division);
        division.getPreferredPlaces().remove(this);
        return this;
    }

    public Division getOwner() {
        return this.owner;
    }

    public void setOwner(Division division) {
        this.owner = division;
    }

    public Place owner(Division division) {
        this.setOwner(division);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Place)) {
            return false;
        }
        return id != null && id.equals(((Place) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Place{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", numberOfSeats=" + getNumberOfSeats() +
            ", shortName='" + getShortName() + "'" +
            ", colorBackground='" + getColorBackground() + "'" +
            ", colorText='" + getColorText() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
