// background.js

// Set up an event listener for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'notify') {
        handleNotification(request.payload);
    }
    sendResponse({status: 'success'});
});

// Function to handle notifications
function handleNotification(payload) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: payload.title,
        message: payload.message,
        priority: 2
    }, (notificationId) => {
        console.log('Notification displayed:', notificationId);
    });
}

// Set up an interval for API calls to a hypothetical service endpoint
setInterval(() => {
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched successfully:', data);
            // Process the data here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Error handling and recovery
            handleError(error);
        });
}, 60000); // Call every 60 seconds

// Function to handle errors
function handleError(error) {
    // Implement recovery logic, e.g., retrying the fetch after some time
    console.error('Handling error:', error);
    setTimeout(() => {
        // retry logic can go here
    }, 5000); // Retry after 5 seconds
}

// Telegram integration (hypothetical example)
function sendToTelegram(message) {
    const telegramApiUrl = 'https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/sendMessage';
    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: '<YOUR_CHAT_ID>',
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent to Telegram:', data);
    })
    .catch(error => {
        console.error('Error sending to Telegram:', error);
        handleError(error);
    });
}