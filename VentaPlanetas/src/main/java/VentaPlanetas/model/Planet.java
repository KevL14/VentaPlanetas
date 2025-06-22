package VentaPlanetas.model;

import java.util.List;

public class Planet {
    private String englishName;
    private Double gravity;
    private Long semimajorAxis;
    private Double sideralOrbit;
    private Double sideralRotation;

    private Mass mass;
    private Volume vol;
    private Atmosphere atmosphere;

    // Getters y Setters

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public Double getGravity() {
        return gravity;
    }

    public void setGravity(Double gravity) {
        this.gravity = gravity;
    }

    public Long getSemimajorAxis() {
        return semimajorAxis;
    }

    public void setSemimajorAxis(Long semimajorAxis) {
        this.semimajorAxis = semimajorAxis;
    }

    public Double getSideralOrbit() {
        return sideralOrbit;
    }

    public void setSideralOrbit(Double sideralOrbit) {
        this.sideralOrbit = sideralOrbit;
    }

    public Double getSideralRotation() {
        return sideralRotation;
    }

    public void setSideralRotation(Double sideralRotation) {
        this.sideralRotation = sideralRotation;
    }

    public Mass getMass() {
        return mass;
    }

    public void setMass(Mass mass) {
        this.mass = mass;
    }

    public Volume getVol() {
        return vol;
    }

    public void setVol(Volume vol) {
        this.vol = vol;
    }

    public Atmosphere getAtmosphere() {
        return atmosphere;
    }

    public void setAtmosphere(Atmosphere atmosphere) {
        this.atmosphere = atmosphere;
    }

    public static class Mass {
        private Double massValue;
        private Integer massExponent;
        // Getters y Setters
    }

    public static class Volume {
        private Double volValue;
        private Integer volExponent;
        // Getters y Setters
    }

    public static class Atmosphere {
        private List<Component> components;
        // Getters y Setters
    }

    public static class Component {
        private String name;
        private Double percent;
        // Getters y Setters
    }
}
