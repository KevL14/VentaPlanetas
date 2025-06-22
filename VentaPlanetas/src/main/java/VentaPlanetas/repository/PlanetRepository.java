package VentaPlanetas.repository;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Repository
public class PlanetRepository {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String API_URL = "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true";

    public List<Map<String, Object>> obtenerDatosDesdeApi() {
        Map<String, Object> response = restTemplate.getForObject(API_URL, Map.class);
        return (List<Map<String, Object>>) response.get("bodies");
    }
}
