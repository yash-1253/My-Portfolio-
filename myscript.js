// Profile image modal functionality
const profileImg = document.querySelector('.profile-img');
const modal = document.createElement('div');
modal.className = 'profile-modal';
modal.innerHTML = `
    <div class="modal-content">
        <img src="" alt="Profile Image" class="modal-img">
        <span class="close-modal">&times;</span>
    </div>
`;
document.body.appendChild(modal);

profileImg.addEventListener('click', () => {
    const modalImg = modal.querySelector('.modal-img');
    modalImg.src = profileImg.src;
    modal.style.display = 'flex';
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
});

const closeModal = modal.querySelector('.close-modal');
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = "auto"; // Re-enable scrolling
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = "auto";
    }
});

// Add this CSS for the modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .profile-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 80%;
        max-height: 80vh;
        text-align: center;
    }
    
    .modal-img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 50%;
        border: 5px solid var(--primary-color);
        animation: zoomIn 0.3s ease-out;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: -40px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    }
    
    .close-modal:hover {
        color: var(--primary-color);
    }
    
    @keyframes zoomIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .modal-img {
            width: 90vw;
            height: 90vw;
        }
        
        .close-modal {
            top: -30px;
            right: 0;
            font-size: 30px;
        }
    }
`;
document.head.appendChild(modalStyle);

// Image Modal Functionality
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const profileImage = document.getElementById('profileImg');
const closeImageModal = document.querySelector('.close-modal');

// Function to open modal
function openModal() {
    imageModal.style.display = "flex";
    modalImage.src = profileImage.src;
    document.body.style.overflow = "hidden";
}

// Function to close modal
function closeModal() {
    imageModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Open modal when clicking on profile image
profileImage.addEventListener('click', openModal);

// Close modal when clicking the close button
closeImageModal.addEventListener('click', closeModal);

// Close modal when clicking outside the image
imageModal.addEventListener('click', function(event) {
    if (event.target === imageModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && imageModal.style.display === "flex") {
        closeModal();
    }
});

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
    fetch('https://formspree.io/f/xpwrwkba', {
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
    const closeModal = document.querySelector('.close-modal');
    const modalImg = document.querySelector('.modal-img');

    console.log('Profile Image:', profileImg);
    console.log('Profile Modal:', profileModal);
    console.log('Close Modal:', closeModal);
    console.log('Modal Image:', modalImg);

    if (profileImg && profileModal && closeModal && modalImg) {
        // Open modal when clicking on profile image
        profileImg.addEventListener('click', function() {
            console.log('Profile image clicked');
            profileModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        // Close modal when clicking the close button
        closeModal.addEventListener('click', function() {
            console.log('Close button clicked');
            profileModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside the image
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                console.log('Modal background clicked');
                profileModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && profileModal.style.display === 'flex') {
                console.log('Escape key pressed');
                profileModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.error('Some elements are missing:', {
            profileImg: !!profileImg,
            profileModal: !!profileModal,
            closeModal: !!closeModal,
            modalImg: !!modalImg
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