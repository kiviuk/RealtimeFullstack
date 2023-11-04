import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {allUsersRoute, host} from "../utils/APIRoutes";
import styled from "styled-components";
import Welcome from "../components/Welcome";
import Contacts from "../components/Contacts";

function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        (async () => {
            const currentUserData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
            if (!currentUserData) {
                console.log("Chat: No user found in local storage")
                navigate("/login");
            } else {
                console.log("Chat: User found in local storage")
                const currentUser = JSON.parse(currentUserData);

                if (!currentUser.hasAvatarImage) {
                    console.log("fetchContactsAndLookUpCurrentUser: current use has no avatar image")
                    navigate("/update-avatar")
                }

                setCurrentUser(currentUser)
                const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`)

                console.log(
                    "fetchContactsAndLookUpCurrentUser: contact data found '"
                    + JSON.stringify(data.map(user => user.username))
                    + "'"
                );

                setContacts(data);
            }
        })();

    }, [navigate]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <Container>
            <div className="container">
                <Contacts
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                <Welcome currentUser={currentUser}/>
            </div>
        </Container>
    );

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat