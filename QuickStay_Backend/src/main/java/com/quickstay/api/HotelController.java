package com.quickstay.api;

import com.quickstay.dto.HotelDto;
import com.quickstay.dto.RoomDto;
import com.quickstay.service.HotelService;
import com.quickstay.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private RoomService roomService;

    @GetMapping("/all")
    public List<HotelDto> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public HotelDto getHotelById(@PathVariable Long id) {
        return hotelService.getHotelById(id);
    }

    @PostMapping("/create")
    public HotelDto createHotel(@RequestBody HotelDto hotel) {
        return hotelService.createHotel(hotel);
    }

    @PostMapping("/{hotelId}/rooms")
    public RoomDto addRoomToHotel(@PathVariable Long hotelId, @RequestBody RoomDto room) {
        return roomService.addRoomToHotel(hotelId, room);
    }

    @DeleteMapping("/{hotelId}/rooms/{roomId}")
    public RoomDto deleteRoom(@PathVariable Long hotelId, @PathVariable Long roomId) {
        return roomService.deleteRoom(hotelId, roomId);
    }

    @DeleteMapping("/{hotelId}")
    public HotelDto deleteHotel(@PathVariable Long hotelId) {
        return roomService.deleteHotel(hotelId);
    }
}
