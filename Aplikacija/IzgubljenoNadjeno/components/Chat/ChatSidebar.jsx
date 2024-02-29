import styles from "../../styles/chat.module.css";
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    where,
    getDoc,
    doc,
    orderBy,
    limit,
    updateDoc
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, storage } from "../../config/firebase";
import getOtherEmail from "../../utils/getOtherEmail";
import { useEffect, useState, useRef } from "react";
import { getDownloadURL, ref } from "firebase/storage";



export default function ChatSidebar(props) { //<----Kroz props prenosim id Vlasnika Post-a I id chat-a*/



    useEffect(() => {

        const querry = query(collection(db, "chats"), where('users', 'array-contains', props.korisnik.email));
        onSnapshot(querry, querrySnapshot => {
            let chat_help = [];
            querrySnapshot.forEach(element => {
                chat_help.push({ ...element.data(), id: element.id }); //potencijalna greska duplikata
            });
            props.setChats(chat_help);
        });
    }, [])

    useEffect(() => {
        if (props.kliknutiChat)
            otvoriChat();
    }, [props.kliknutiChat])

    const otvoriChat = () => {
        // props.setKliknutiChat(id); 
        const idChata = props.kliknutiChat;
        const messagesRef = collection(db, "chats", idChata, "messages");
        const messagesQuerry = query(messagesRef, orderBy("timestamp"));
        onSnapshot(messagesQuerry, (querrySnapshot) => {
            let poruke = [];
            querrySnapshot.forEach((doc) => {
                const poruka = doc.data();
                poruke.push(poruka);
            });
            props.setMessages(poruke);
        })
    }
    /* useEffect(() => {
        if (props.kliknutiChat) {
            otvoriChat(props.kliknutiChat);

        }
        console.log(props.kliknutiChat);
    }, [props.kliknutiChat]); */

    function Ispis(props2) {
        const [prikazi, setPrikazi] = useState(false);

        useEffect(() => {
            const tmp = doc(db, "chats", props2.neotvoreniChat);
            getDoc(tmp).then((x) => {
                if (x.exists()) {
                    const data = x.data();
                    if (data.poslednja_poruka !== props.korisnik?.email && data.poslednja_poruka !== null) {
                        setPrikazi(true);
                        // console.log(data.poslednja_poruka);
                    }
                }
            });
        }, [props2.neotvoreniChat, props.korisnik]);

        return (
            <>
                {prikazi && <div className={styles.unreadIndicator}>●</div>}
            </>
        );
    }

    /*     useEffect(() => {
            setBrojNeprocitanih(brojNeprocitanihRef.current);
        }, []); */

    //Render svih chatova
    const ChatList = () => {
        return (
            props.chats?.map( //prikazi chatove u kojima ucestvuje trenutni korisnik
                chat =>
                    <div
                        onClick={() => props.setKliknutiChat(chat.id)} //id chat-a je na klik ovog diva
                        className={styles.chatSidebarChat}>
                        <Ispis
                            neotvoreniChat={chat.id} />
                        {/* <img
                                className={styles.chatSidebarChatPfp}
                                src="https://th.bing.com/th/id/OIP.cQL9pRlXh-HNIeU4NzYPmAHaHa?pid=ImgDet&rs=1"
                                style={{ width: "3vw", height: "5vh" }} /> */}
                        {props.korisnik &&
                            <h4 className={styles.mejlovi} >{chat.users[0] == props.korisnik.email ? chat.users[1] : chat.users[0]}</h4>}
                    </div>
            ));
    }

    return (
        <div className={styles.chatSidebarContainer}>
            <div className={styles.chatSidebarNav}>
                <div className={styles.chatSidebarNavContent}>
                    <h1 className={styles.chatSidebarNavUsername}>Konverzacije:</h1>
                </div>
            </div>

            <div className={styles.chatSidebarChatContainer}>
                <ChatList />
            </div>

        </div>
    );
}
