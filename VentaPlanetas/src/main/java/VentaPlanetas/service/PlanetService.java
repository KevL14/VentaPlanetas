package VentaPlanetas.service;

import VentaPlanetas.model.Planet;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import VentaPlanetas.repository.PlanetRepository;

@Service
@RequestMapping("/api/planet")
public class PlanetService {
    @Autowired
    private PlanetRepository planetRepository;

      public Planet addPlanet(Planet planet){
        return this.planetRepository.save(planet);
    }
    public List<Planet> getAllPlanets(){
        return this.planetRepository.findAll();
    }
   public Optional<Planet> findPlanetByName(String name) {
        return this.planetRepository.findByName(name);
    }
    public Planet editPlanet(Integer id, Planet planetEdit){
        Optional<Planet> planetOptional=this.planetRepository.findById(id);
 if (planetOptional.isPresent()) {
        Planet existingPlanet = planetOptional.get();
        
        existingPlanet.setName(planetEdit.getName());
        existingPlanet.setAtmosphere(planetEdit.getAtmosphere());
        existingPlanet.setType(planetEdit.getType());
        existingPlanet.setClimate(planetEdit.getClimate());
        existingPlanet.setDescription(planetEdit.getDescription());

        return planetRepository.save(existingPlanet); // ✅ se guarda el objeto ya existente
    }
        return null;
    }
    public void deletePlanet(Integer id){
        this.planetRepository.deleteById(id);
    }
  public Optional<Planet> findPlanetById(Integer id) {
        return this.planetRepository.findById(id);
    }

}
