// Newsletter Subscription Functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterSubmit = document.getElementById('newsletterSubmit');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    const newsletterError = document.getElementById('newsletterError');
    const errorText = document.getElementById('errorText');
    const btnText = newsletterSubmit.querySelector('.btn-text');
    const loadingSpinner = newsletterSubmit.querySelector('.loading-spinner');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate email
            const email = newsletterEmail.value.trim();
            if (!isValidEmail(email)) {
                showError('Please enter a valid email address.');
                return;
            }

            // Show loading state
            setLoadingState(true);
            
            // Simulate API call (Replace with your actual backend endpoint)
            subscribeToNewsletter(email);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoadingState(loading) {
        if (loading) {
            btnText.style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            newsletterSubmit.disabled = true;
            newsletterEmail.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            newsletterSubmit.disabled = false;
            newsletterEmail.disabled = false;
        }
    }

    function showError(message) {
        errorText.textContent = message;
        newsletterError.style.display = 'block';
        newsletterSuccess.style.display = 'none';
        
        // Auto hide error after 5 seconds
        setTimeout(() => {
            newsletterError.style.display = 'none';
        }, 5000);
    }

    function showSuccess() {
        newsletterSuccess.style.display = 'block';
        newsletterError.style.display = 'none';
        newsletterForm.reset();
        
        // Auto hide success after 5 seconds
        setTimeout(() => {
            newsletterSuccess.style.display = 'none';
        }, 5000);
    }

    // Simulated newsletter subscription function
    function subscribeToNewsletter(email) {
        // For demo purposes, we'll simulate API call
        setTimeout(() => {
            // ALWAYS SUCCESS - yo line change gara
            const isSuccess = true; // Math.random() > 0.1 -> yo hataune
            
            if (isSuccess) {
                showSuccess();
                
                // Console maa dekhaune matrai
                console.log('Successfully subscribed email:', email);
                
            } else {
                showError('Network error. Please check your connection and try again.');
            }
            
            setLoadingState(false);
        }, 1000);
    }
});