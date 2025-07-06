// package VentaPlanetas.model;


// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;


// @Entity
// @Table(name = "tb_invoice")
// public class Invoice {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Integer id;


//     @Column(nullable = false)
//     private LocalDate fecha;

//     @Column(nullable = false)
//     private Double monto;

//     @Column(nullable = false, length = 10)
//     private String tipo; //

//     // Constructor vacío
//     public Factura() {}

//     // Constructor completo
//     public Factura(LocalDate fecha, Double monto, String tipo, Lot lote, User usuario, Planet planeta) {
//         this.fecha = fecha;
//         this.monto = monto;
//         this.tipo = tipo;
//         this.lote = lote;
//         this.usuario = usuario;
//         this.planeta = planeta;
//     }
// }