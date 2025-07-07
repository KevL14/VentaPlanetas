package VentaPlanetas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Integer age;

    @Column()
    private Integer credit;

    @Column()
    private Integer creditInicial;  // NUEVO CAMPO

    @Column(nullable = false)
    private Boolean admin;

    // Constructor con creditInicial
    public User(Integer id, String name, String email, String password, Integer credit, Integer creditInicial, Integer age, Boolean admin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.credit = credit;
        this.creditInicial = creditInicial;
        this.admin = admin;
    }

    // Constructor vacío
    public User() {
        this.id = 0;
        this.name = "";
        this.email = "";
        this.password = "";
        this.age = 0;
        this.credit = 0;
        this.creditInicial = 0;  // inicializar para evitar null
        this.admin = false;
    }

    // Getters y setters...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Integer getCreditInicial() {
        return creditInicial;
    }

    public void setCreditInicial(Integer creditInicial) {
        this.creditInicial = creditInicial;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

}
