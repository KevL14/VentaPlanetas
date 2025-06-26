package VentaPlanetas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import VentaPlanetas.model.Lot;
import VentaPlanetas.repository.LotRepository;

@Service
public class LotService {
    @Autowired
    LotRepository lotRepository;

    public Lot addLot(Lot lot){
        return this.lotRepository.save(lot);
    }
    public Optional<Lot> findLotById(Integer id){
        return this.lotRepository.findById(id);
    }

    public Lot editLot(Integer id, Lot lotEdit){
                Optional<Lot> lotOptional=this.lotRepository.findById(id);
        if (lotOptional.isPresent()) {
                Lot existinglot = lotOptional.get();
                existinglot.setOwnerId(lotEdit.getOwnerId());
                existinglot.setPlace(lotEdit.getPlace());
                existinglot.setTypePlace(lotEdit.getTypePlace());
                existinglot.setSquareSize(lotEdit.getSquareSize());
                existinglot.setURLImage(lotEdit.getURLImage());

                return lotRepository.save(existinglot); // ✅ se guarda el objeto ya existente
            }
                return null;
    }

    public List<Lot> getAllLots(){
        return this.lotRepository.findAll();
    }

    public void deleteLot(Integer id){
        this.lotRepository.deleteById(id);
    }

}
