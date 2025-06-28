// Form Submission Handler
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    // Send the form data
    fetch('https://formspree.io/f/xjkrjlog', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // Reset form
            this.reset();
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
        submitBtn.style.backgroundColor = '#f44336';
    })
    .finally(() => {
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    });
});

// Profile Photo Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');
    const profileModal = document.getElementById('profileModal');
    const closeModal = profileModal.querySelector('.close-modal');
    const modalImg = profileModal.querySelector('.modal-img');

    if (profileImg && profileModal && closeModal && modalImg) {
        // REMOVE the click event on profile image
        // profileImg.addEventListener('click', function() {
        //     modalImg.src = profileImg.src || './My_Image.jpeg';
        //     modalImg.style.display = 'block';
        //     profileModal.style.display = 'flex';
        //     document.body.style.overflow = 'hidden';
        // });

        // Add error handler for broken image
        modalImg.onerror = function() {
            modalImg.src = './My_Image.jpeg';
        };

        // Close modal when clicking the close button
        closeModal.addEventListener('click', function() {
            profileModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside the image
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                profileModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && profileModal.style.display === 'flex') {
                profileModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// WhatsApp Message Functionality
function sendWhatsAppMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Format the message
    const formattedMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    
    // Create WhatsApp URL with your number
    const whatsappURL = `https://api.whatsapp.com/send?phone=917265950093&text=${formattedMessage}`;
    
    // Create a hidden iframe to send the message
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = whatsappURL;
    document.body.appendChild(iframe);
    
    // Reset the form
    document.getElementById('contactForm').reset();
    
    // Show success message
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.backgroundColor = '#4CAF50';
    
    // Remove iframe after sending
    setTimeout(() => {
        document.body.removeChild(iframe);
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
    }, 3000);
}

// Email Sending Functionality
function sendEmail(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Format the email body
    const subject = `New Contact Form Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:pansaravidhan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create and click a temporary link
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Show success message
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Email Client Opened!';
    submitBtn.style.backgroundColor = '#4CAF50';
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.style.backgroundColor = '';
    }, 3000);
}