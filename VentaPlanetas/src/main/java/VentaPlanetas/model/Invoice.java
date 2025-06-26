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

//     @Column(nullable = false, unique = true, length = 10)
//     private String numeroFactura;

//     @Column(nullable = false)
//     private LocalDate fecha;

//     @Column(nullable = false)
//     private Double monto;

//     @Column(nullable = false, length = 10)
//     private String tipo; // "INGRESO" o "GASTO"

//     // Constructor vacío
//     public Factura() {}

//     // Constructor completo
//     public Factura(String numeroFactura, LocalDate fecha, Double monto, String tipo, Lot lote, User usuario, Planet planeta) {
//         this.numeroFactura = numeroFactura;
//         this.fecha = fecha;
//         this.monto = monto;
//         this.tipo = tipo;
//         this.lote = lote;
//         this.usuario = usuario;
//         this.planeta = planeta;
//     }
// }