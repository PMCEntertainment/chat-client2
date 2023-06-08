
import React, {useState, useEffect
} from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('https://api-chat.phuongmychi.vn/v1/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = async event => {
        event.preventDefault();

        if (inputValue.trim() !== '') {
            const message = {
                content: inputValue,
                sender: 'User1', // 
            };

            try {
                await fetch('https://api-chat.phuongmychi.vn/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                });
            } catch (error) {
                console.error('Error sending message:', error);
            }

            setInputValue('');
        }
    };

    return ( <div>
            <ul>{messages.map((message, index) => (<li key = {index
                        }>
                        <strong> {message.sender}: </strong> {message.content
                    }</li>))} </ul> 
                    <form onSubmit={handleSendMessage}>
        <input type="text" value={inputValue} onChange={handleInputChange}/> 
        <button type="submit"> Send </button> 
        </form> 
        </div>
);
}

export default App


