package VentaPlanetas;  // <-- Agrega el paquete que quieras, solo que sea consistente

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class  	VentaPlanetasApplication {

	public static void main(String[] args) {
		SpringApplication.run(VentaPlanetasApplication.class, args);
		System.out.println("app Levantada");
	}
}
