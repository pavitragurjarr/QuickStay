package com.quickstay.service;

import com.quickstay.dto.HotelDto;
import com.quickstay.dto.RoomDto;
import com.quickstay.model.Hotel;
import com.quickstay.model.Room;
import com.quickstay.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public List<HotelDto> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        List<HotelDto> hotelDtos = new ArrayList<>();
        for (Hotel hotel : hotels) {
            HotelDto hotelDto = new HotelDto();
            hotelDto.setId(hotel.getId());
            hotelDto.setName(hotel.getName());
            hotelDto.setLocation(hotel.getLocation());
            hotelDto.setContactNumber(hotel.getContactNumber());
            hotelDto.setAddress(hotel.getAddress());
            for (Room room : hotel.getRooms()) {
                RoomDto roomDto = new RoomDto();
                roomDto.setId(room.getId());
                roomDto.setRoomType(room.getRoomType());
                roomDto.setPrice(room.getPrice());
                roomDto.setAvailable(room.isAvailable());
                hotelDto.getRooms().add(roomDto);
            }
            hotelDtos.add(hotelDto);
        }
        return hotelDtos;
    }

    public HotelDto getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found"));
        HotelDto hotelDto = new HotelDto();
        hotelDto.setId(hotel.getId());
        hotelDto.setName(hotel.getName());
        hotelDto.setLocation(hotel.getLocation());
        hotelDto.setContactNumber(hotel.getContactNumber());
        hotelDto.setAddress(hotel.getAddress());
        for (Room room : hotel.getRooms()) {
            RoomDto roomDto = new RoomDto();
            roomDto.setId(room.getId());
            roomDto.setRoomType(room.getRoomType());
            roomDto.setPrice(room.getPrice());
            roomDto.setAvailable(room.isAvailable());
            hotelDto.getRooms().add(roomDto);
        }
        return hotelDto;
    }

    public HotelDto createHotel(HotelDto hotelDto) {
        Hotel hotel = new Hotel();
        hotel.setName(hotelDto.getName());
        hotel.setLocation(hotelDto.getLocation());
        hotel.setContactNumber(hotelDto.getContactNumber());
        hotel.setAddress(hotelDto.getAddress());
        Hotel saved = hotelRepository.save(hotel);
        hotelDto.setId(saved.getId());
        return hotelDto;
    }
}
