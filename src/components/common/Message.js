import React from 'react';

const Message = ({ children }) => (
    <h2 className="message charged">{ children }</h2>
);

Message.displayName = 'Message';

export default Message;