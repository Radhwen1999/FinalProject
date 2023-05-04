package com.example.coco_spring.Controller.Delivery;

import com.example.coco_spring.Entity.ProviderLocation;
import com.example.coco_spring.Entity.Delivery;
import com.example.coco_spring.Repository.OrderRepository;
import com.example.coco_spring.Service.Delivery.DeliveryService;
import lombok.AllArgsConstructor;
import com.example.coco_spring.Entity.Provider;
import com.example.coco_spring.Entity.StoreLocations;
import com.example.coco_spring.Repository.DeliveryRepository;
import com.example.coco_spring.Service.Delivery.DeliveryService;
import com.example.coco_spring.Service.Delivery.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/delivery/")
@CrossOrigin("*")

public class DeliveryController {
    @Autowired

    DeliveryService deliveryService;
    @PostMapping("/add_delivery/{lat}/{lng}")
    public Delivery addDelivery(@RequestBody Delivery delivery,@PathVariable("lat") double lat,@PathVariable("lng") double lng ){
        return deliveryService.addjjj(delivery,lat,lng);
    }

    @GetMapping("/retrive_all_deliveries")
    public List<Delivery> retrieveDeliveryList(){

        return deliveryService.findAll();
    }
    @PutMapping("/changeStatusToDelivered/{id}")
    public  Delivery changeStatusToDelivered(@PathVariable("id")Long id){
        return   deliveryService.changeStatusToDelivered(id);
    }

    @PostMapping("/dispatch/{deliveryId}")
    public Provider dispatchDeliveryToNearestDeliveryman(@PathVariable("deliveryId") Long deliveryId) {
        Delivery delivery = deliveryService.dispatchDeliveryToNearestDeliveryman(deliveryId);
        return delivery.getProvider();
    }

}
