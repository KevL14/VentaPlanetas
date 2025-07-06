package VentaPlanetas.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_invoice")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer ownerId;

    @Column(nullable = false)
    private Integer lotId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Double amount;

    // 🔹 Constructor vacío
    public Invoice() {
    }

    // 🔹 Constructor completo
    public Invoice(Integer ownerId, Integer lotId, String userName, LocalDate date, Double amount) {
        this.ownerId = ownerId;
        this.lotId = lotId;
        this.userName = userName;
        this.date = date;
        this.amount = amount;
    }

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

    public Integer getLotId() {
        return lotId;
    }

    public void setLotId(Integer lotId) {
        this.lotId = lotId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }


}