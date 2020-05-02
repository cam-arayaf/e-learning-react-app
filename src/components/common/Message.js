import React from 'react';

const Message = ({ children }) => (
    <h2 className="message">{ children }</h2>
);

Message.displayName = 'Message';

export default Message;