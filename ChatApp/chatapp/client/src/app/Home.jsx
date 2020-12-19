import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Messages from './Messages';
import './home.css';

const Home = () => {
    return (
        <div className="main">
            <div className="header">
                <h1>ChatApp</h1>
                <Link to={'/'}>
                    <button className="logout-btn">Log out</button>
                </Link>
            </div>
            <div className="message-area">
                {/* <div className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae aut tempora suscipit, a dolore fugit ex saepe eveniet omnis quis illo, earum rerum beatae tenetur, dolorum similique id sint! Inventore?</div>
                <div className="message"><p>Lorem Ipsum</p></div>
                <div className="message">Lorem Ipsum</div>
                <div className="message">Lorem Ipsum</div> */}
                <Messages sender={false} />
                <Messages sender={true} />
                <Messages sender={false} />
                <Messages sender={true} />

            </div>
            <div className="send-chat-area">
                <input className="input-field" placeholder="Enter message here" />
                <button className="send-button"> {'>'} </button>
            </div>
        </div >
    );
}

export default Home;

// class Home extends Component {
    //     // Initialize the state
    //     constructor(props) {
        //         super(props);
        //         this.state = {
            //             list: []
            //         }
            //     }

            //     // Fetch the list on first mount
            //     componentDidMount() {
                //         this.getList();
                //     }

                //     // Retrieves the list of items from the Express app
                //     getList = () => {
                    //         fetch('/api/getList')
                    //             .then(res => res.json())
                    //             .then(list => this.setState({ list }))
                    //     }

                    //     render() {
                        //         const { list } = this.state;

                        //         return (
                            //             <div className="App">
                            //                 <h1>List of Items</h1>
                            //                 {/* Check to see if any items are found*/}
                            //                 {list.length ? (
                                //                     <div>
                                //                         {/* Render the list of items */}
                                //                         {list.map((item) => {
                                    //                             return (
                                        //                                 <div>
                                        //                                     {item}
                                        //                                 </div>
                                        //                             );
                                        //                         })}
                                        //                     </div>
                                        //                 ) : (
                                            //                         <div>
                                            //                             <h2>No List Items Found</h2>
                                            //                         </div>
                                            //                     )
                                            //                 }
                                            //             </div>
                                            //         );
                                            //     }
                                            // }

                                            // export default Home;