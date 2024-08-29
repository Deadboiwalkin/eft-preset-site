// Cookies

document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookiePopup = document.createElement('div');
        cookiePopup.id = 'cookie-popup';
        cookiePopup.style.position = 'fixed';
        cookiePopup.style.bottom = '20px'; // Add some space from the bottom
        cookiePopup.style.left = '50%';
        cookiePopup.style.transform = 'translateX(-50%)';
        cookiePopup.style.padding = '15px';
        cookiePopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Set the alpha channel to control transparency
        cookiePopup.style.boxShadow = '0 0 30px rgba(232, 190, 107, 0.8)'; // Add box shadow
        cookiePopup.style.color = '#fff';
        cookiePopup.style.textAlign = 'center';
        cookiePopup.style.borderRadius = '10px'; // Add border-radius for a rounded appearance

        // Text explaining cookie usage
        const textElement = document.createElement('p');
        textElement.innerHTML = `This website uses cookies to ensure you get the best experience on our website. `;

        // "Read more" link
        const readMoreLink = document.createElement('span');
        readMoreLink.textContent = 'Read more : ';
        readMoreLink.style.color = '#fff';

        // Privacy Policy link
        const privacyLink = document.createElement('a');
        privacyLink.href = 'privacy.html';
        privacyLink.textContent = 'Privacy Policy';
        privacyLink.style.color = '#AEAEB0';
        privacyLink.style.textDecoration = 'underline';
        privacyLink.style.marginRight = '10px';

        // "Accept" button
        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accept';
        acceptButton.style.backgroundColor = '#413d34';
        acceptButton.style.color = 'white';
        acceptButton.style.padding = '10px 20px';
        acceptButton.style.border = 'none';
        acceptButton.style.borderRadius = '5px';
        acceptButton.style.cursor = 'pointer';
        acceptButton.style.marginTop = '15px'; // Add margin-top for better spacing

        // Append elements to the popup container
        cookiePopup.appendChild(textElement);
        cookiePopup.appendChild(readMoreLink);
        readMoreLink.appendChild(privacyLink);
        cookiePopup.appendChild(document.createElement('br')); // Add a line break for better spacing
        cookiePopup.appendChild(acceptButton);

        document.body.appendChild(cookiePopup);

        acceptButton.addEventListener('click', function () {
            cookiePopup.style.display = 'none';
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }
});
