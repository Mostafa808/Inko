// Replace this with your actual OpenAI API key
const OPENAI_API_KEY = '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';

// Wait until the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('button'); // Start Writing Now button
    const aiEditor = document.querySelector('#ai-editor-preview'); // AI editor preview
    const closeEditorButton = aiEditor.querySelector('.close-editor'); // Close editor button

    // When the user clicks on the "Start Writing Now" button
    startButton.addEventListener('click', () => {
        aiEditor.style.display = 'block'; // Show the AI editor preview
    });

    // When the user clicks on the "Close" button in the editor
    closeEditorButton.addEventListener('click', () => {
        aiEditor.style.display = 'none'; // Hide the AI editor preview
    });

    // Grab the elements in the AI editor
    const submitButton = aiEditor.querySelector('#submit-writing'); // Submit button
    const textArea = aiEditor.querySelector('textarea'); // Text area for user input
    const outputDiv = aiEditor.querySelector('.output div'); // Output div where enhanced text will be shown

    // When the user clicks "Submit Writing"
    submitButton.addEventListener('click', async function () {
        const inputText = textArea.value; // Get the text the user has entered

        if (inputText.trim() === '') {
            alert('Please enter some text to improve!'); // Alert if no text is entered
            return;
        }

        outputDiv.innerHTML = 'Processing... Please wait.'; // Display processing message

        try {
            // Call OpenAI API for text enhancement using Chat API
            const enhancedText = await generateAIResponse(inputText);
            outputDiv.innerHTML = `Enhanced Text: ${enhancedText}`; // Show AI-enhanced text
        } catch (error) {
            outputDiv.innerHTML = 'Error: Unable to process your request. Please try again later.'; // Show error message if request fails
            console.error(error);
        }
    });

    // Function to call OpenAI's API using the Chat Completion model
    async function generateAIResponse(inputText) {
        const url = 'https://api.openai.com/v1/chat/completions'; // OpenAI API endpoint
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}` // Your OpenAI API Key
        };

        const data = {
            model: 'gpt-4o-mini', // Specify the GPT-4 model you're using
            store: true, // Store the completion results (optional)
            messages: [
                { "role": "user", "content": inputText } // The user's input to enhance
            ]
        };

        // Send the request to OpenAI API
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        const result = await response.json(); // Parse the JSON response

        // Check for errors in the OpenAI response
        if (result.error) {
            throw new Error(result.error.message);
        }

        // Return the enhanced text from OpenAI response
        return result.choices[0].message.content.trim();
    }
    
    // Scroll animation and smooth scrolling when a section link is clicked
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const targetId = link.getAttribute('href').substring(1); // Get target section ID
            const targetElement = document.getElementById(targetId); // Get target section element

            // Smooth scroll to the target section
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Offset to prevent header overlap
                behavior: 'smooth'
            });
        });
    });

    // Testimonial section rotation
    const testimonialContainer = document.querySelector('#testimonials .testimonials-container');
    let testimonialIndex = 0;

    function showTestimonial() {
        const testimonials = testimonialContainer.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === testimonialIndex ? 'block' : 'none';
        });

        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    }

    // Display a new testimonial every 5 seconds
    setInterval(showTestimonial, 5000);
    showTestimonial(); // Show the first testimonial immediately

    // Feature "Show More" toggle interaction
    const featureButtons = document.querySelectorAll('.feature-info-button');
    featureButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const featureDetails = e.target.nextElementSibling; // Get the feature details div
            featureDetails.classList.toggle('show'); // Toggle visibility
            const isShowing = featureDetails.classList.contains('show');
            e.target.textContent = isShowing ? 'Show Less' : 'Show More'; // Change button text
        });
    });

    // Fade in animations for sections when the page loads
    window.addEventListener('load', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = 0; // Start with hidden sections
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.8s ease-out'; // Transition properties
        });

        setTimeout(() => {
            sections.forEach(section => {
                section.style.opacity = 1; // Fade in
                section.style.transform = 'translateY(0)';
            });
        }, 300); // Wait 300ms before starting the animation
    });
});
