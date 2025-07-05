package VentaPlanetas.model;

import java.util.function.DoubleBinaryOperator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_lots")
public class Lot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column (nullable = true)
    private Integer ownerId;

    @Column(nullable = false)
    private String celestialPair;

    @Column(nullable = false)
    private String place;

    @Column (nullable = false)
    private String typePlace;

    @Column(nullable = false)
    private Integer squareSize;

    @Column(nullable = false)
    private Double price;

    @Column
    private String urlImage;

       // Constructor con todos los campos excepto id (generado automáticamente)
    public Lot(Integer ownerId, String celestialPair, String place, String typePlace, Integer squareSize, Double price, String urlImage) {
        this.ownerId = ownerId;
        this.celestialPair = celestialPair;
        this.place = place;
        this.typePlace = typePlace;
        this.squareSize = squareSize;
        this.price = price;
        this.urlImage = urlImage;
    }

    // Constructor vacío
    public Lot() {
    }

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getCelestialPair() {
        return celestialPair;
    }

    public void setCelestialPair(String celestialPair) {
        this.celestialPair = celestialPair;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getTypePlace() {
        return typePlace;
    }

    public void setTypePlace(String typePlace) {
        this.typePlace = typePlace;
    }

    public Integer getSquareSize() {
        return squareSize;
    }

    public void setSquareSize(Integer squareSize) {
        this.squareSize = squareSize;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

}


