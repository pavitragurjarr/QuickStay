package com.quickstay.service;

import com.quickstay.dto.PaymentDto;
import com.quickstay.model.Booking;
import com.quickstay.model.BookingStatus;
import com.quickstay.model.Payment;
import com.quickstay.model.PaymentStatus;
import com.quickstay.repository.BookingRepository;
import com.quickstay.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public PaymentDto createPayment(PaymentDto paymentDto) {
        Booking booking = bookingRepository.findById(paymentDto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(paymentDto.getAmount());
        payment.setPaymentMethod(paymentDto.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());
        Payment saved = paymentRepository.save(payment);
        paymentDto.setTransactionId(saved.getTransactionId());
        paymentDto.setPaymentId(saved.getId());
        return paymentDto;
    }

    public void updatePaymentStatus(Long paymentId, PaymentStatus paymentStatus) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPaymentStatus(paymentStatus);
        paymentRepository.save(payment);

        // If payment is successful, update the associated booking status
        if (paymentStatus == PaymentStatus.SUCCESS) {
            Booking booking = payment.getBooking();
            booking.setBookingStatus(BookingStatus.CONFIRMED);
            bookingRepository.save(booking);
        }
    }
}
