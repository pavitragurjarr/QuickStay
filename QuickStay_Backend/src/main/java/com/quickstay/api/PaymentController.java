package com.quickstay.api;

import com.quickstay.dto.PaymentDto;
import com.quickstay.model.PaymentStatus;
import com.quickstay.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public PaymentDto createPayment(@RequestBody PaymentDto paymentDto) {
        return paymentService.createPayment(paymentDto);
    }

    @PutMapping("/{paymentId}/status/{paymentStatus}")
    public void updatePaymentStatus(@PathVariable Long paymentId, @PathVariable PaymentStatus paymentStatus) {
        paymentService.updatePaymentStatus(paymentId, paymentStatus);
    }
}
