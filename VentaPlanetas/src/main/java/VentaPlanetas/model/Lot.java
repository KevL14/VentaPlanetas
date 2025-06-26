package VentaPlanetas.model;

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
    @Column(unique = true, nullable = false)
    private Integer ownerId;

    @Column(nullable = false)
    private String place;
    @Column (nullable = false)
    private String typePlace;
    @Column(nullable = false)
    private Integer squareSize;
    @Column(nullable = false)
    private String urlImage;

    

    public Lot(){
    }

    public Lot(Integer ownerId, String place, String typePlace, Integer squareSize, String urlImage) {
        this.ownerId = ownerId;
        this.place = place;
        this.typePlace = typePlace;
        this.squareSize = squareSize;
        this.urlImage = urlImage;
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

     public String getURLImage() {
        return urlImage;
    }

    public void setURLImage(String urlImage) {
        this.urlImage = urlImage;
    }

}


