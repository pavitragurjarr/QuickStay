package com.quickstay.repository;


import com.quickstay.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByIsAvailable(Boolean isAvailable);

    @Query("SELECT r FROM Room r WHERE r.id NOT IN (SELECT b.room.id FROM Booking b WHERE b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate)")
    List<Room> findAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate);
}
