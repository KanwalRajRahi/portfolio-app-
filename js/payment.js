document.addEventListener('DOMContentLoaded', function() {
    const bookConsultationBtn = document.getElementById('bookConsultation');
    
    bookConsultationBtn.addEventListener('click', function() {
        // Replace 'YOUR_KEY_ID' with your actual Razorpay Key ID
        const options = {
            key: 'rzp_test_RbFgP2lJY1Mr22', // Your test key ID
            amount: 2000000, // Amount in paise (₹2,000)
            currency: 'INR',
            name: 'Kanwal Raj Rahi',
            description: 'Professional Consultation (1 Hour)',
            image: 'images/your-logo.png', // Replace with your logo path
            handler: function(response) {
                // Handle successful payment
                alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                // Here you can add code to send the payment details to your server
                // and schedule the consultation
            },
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            theme: {
                color: '#007bff'
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    });
}); 