import React from 'react';
import './messages.css';
import dayjs from 'dayjs';


const Messages = (props) => {
    const { sender } = props;
    let classname;
    let time = dayjs().format('hh:mm A');
    // let currTime = time.getHours() + ":" + time.getMinutes();
    sender === true ? classname = 'message-sender' : classname = 'message-reciever';
    return (
        <div className={classname}>
            Lorem ipsum dolor sit. Quaerat porro corrupti ex est.
            <p className='text-muted'>{time}</p>
        </div>);
}

export default Messages;