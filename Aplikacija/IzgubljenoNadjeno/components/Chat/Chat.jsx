//***************FIREBASE*********************** */
import { auth, db } from "../../config/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, limit, onSnapshot, addDoc, serverTimestamp, updateDoc, setDoc } from "firebase/firestore";

//****************COMPONENTS********************/
import ChatSidebar from "./ChatSidebar";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";

//************REACT***************************/
import { useState, useEffect } from "react";

//***************STYLES***********************/
import styles from "../../styles/chat.module.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { sendEmail } from "../../utils/api";



const Bottombar = (props) => {
    const [input, setInput] = useState("");
    const kliknutiChat = props.kliknutiChat; //preneto da bi se koristilo za subcollection
    const korisnik = props.korisnik;
    /* const vlasnik = props.vlasnik */



    const sendMessage = async (e) => {
        e.preventDefault();

        if (kliknutiChat && input != "") {
            await addDoc(collection(db, "chats", kliknutiChat, "messages"), {
                text: input,
                sender: korisnik.email,
                timestamp: serverTimestamp(),
            });
            const tmp = doc(db, "chats", kliknutiChat);
            getDoc(tmp).then(() => {
                updateDoc(tmp, {
                    poslednja_poruka: korisnik.email
                })
            })
        }
        setInput("");
    }


    return (
        //FORM CONTROL MISSING
        <div className={styles.bottombarContainer}>
            <form className={styles.bottombarFrom} onSubmit={sendMessage}>
                <input className={styles.bottombarInput}
                    placeholder="Napisite poruku..."
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                <button className={styles.bottomBarButton}
                    type="submit"
                    autoCorrect="off"
                >
                    <ChevronDoubleRightIcon className={styles.bottombarButtonIcon} />
                </button>
            </form>
        </div>
    )
}

export default function Chat(props) { //<------preuzimam prosledjeno iz sidebar*****/

    const Topbar = (props) => {
        const [mejl, setMejl] = useState('');

        useEffect(() => {
            const fetchMejl = async () => {
                const tmp = doc(db, 'chats', kliknutiChat);
                const docSnapshot = await getDoc(tmp);
                if (docSnapshot.exists()) {
                    const chat = docSnapshot.data();
                    const mejlFromUsers = chat.users.find((user) => user !== emailKorisnika);
                    setMejl(mejlFromUsers);
                }
            };

            fetchMejl();
        }, []);

        return (
            <div className={styles.topbarContainer}>
                <h2 className={styles.mejlic}>{mejl}</h2>
            </div>
        );
    };

    /*OVDE IMAM TRENUTNOG KORISNIKA I IdVLASNIKA || i sve radi*/
    const [procitano, setProcitano] = useState(false);
    const [messages, setMessages] = useState();
    const [kliknutiChat, setKliknutiChat] = useState(); //id aktuelnog chat-a

    const korisnik = props.korisnik;
    const emailKorisnika = korisnik?.email;
    const usernameKorisnika = props.usernameKorisnika;
    const slikaKorisnika = props.slikaKorisnika;
    /**********************VLASNIK****************************/
    const [vlasnikData, setVlasnikData] = useState(null);
    /**********************************************************/
    useEffect(() => {
        if (props.vlasnikKomeSaljem != null) { //otvoriChat pozovi
            const imaHelper = postoji();
            console.log(imaHelper);
            if (imaHelper == 0) {
                dodajChat();
            }
            else {
                setKliknutiChat(imaHelper);
            }
        }
    }, [props.vlasnikKomeSaljem])



    function dodajChat() { //ovde se pravi chat

        sendEmail(props.vlasnikKomeSaljem.imejl);

        addDoc(collection(db, "chats"), {
            "users": [props.korisnik.email, props.vlasnikKomeSaljem.imejl],
            "poslednja_poruka": props.korisnik.email
        })
            .then(x => {
                addDoc(collection(db, "chats", x.id, "messages"), {
                    text: "Zapoceto novo caskanje",
                    sender: "prvaPoruka",
                    timestamp: serverTimestamp()
                }).then(y => {
                    setKliknutiChat(x.id)
                })

            })
        props.setVlasnikKomeSaljem(null);
    }

    function postoji() {
        let ima = 0;
        props.chats.map(chat => {
            if (chat.users[0] == props.vlasnikKomeSaljem.imejl ||
                chat.users[1] == props.vlasnikKomeSaljem.imejl) {
                ima = chat.id;
            }
        });
        /* if (ima != 0) */
        return ima;
    }

    function PrintMessages() {

        const tmp = doc(db, "chats", kliknutiChat);
        getDoc(tmp).then(x => {
            if (x.exists()) {
                const data = x.data();
                if (data.poslednja_poruka != emailKorisnika) {
                    updateDoc(tmp, {
                        poslednja_poruka: null
                    })
                }
            }
        })
        return (
            <div>
                {kliknutiChat &&
                    <Topbar
                        slikaKorisnika={slikaKorisnika}
                        usernameKorisnika={usernameKorisnika} />}


                <div style={{ display: "flex", flexDirection: "column" }}>
                    {messages?.map(msg => {
                        return <div
                            className={
                                emailKorisnika == msg.sender ? styles.messageContainerRecieved :
                                    (msg.sender === "prvaPoruka" ? styles.messageContainerFirst :
                                        styles.messageContainerSent)}>
                            <p className={styles.text}>{msg.text}</p>
                        </div>
                    })}
                </div >
            </div>
        );
    }


    return (
        <div className={styles.chatMainDiv}>
            <div className={styles.chatContainer}>




                <div className={styles.rightContainer}>
                    <Bottombar
                        kliknutiChat={kliknutiChat}
                        korisnik={korisnik}
                        /* vlasnik={vlasnikData} */ />
                    <div className={styles.chatAreaContainer}>
                        {kliknutiChat && <PrintMessages />}
                    </div>
                </div>

                {/* U ChatSidebar prenosim id vlasnika */}
                <ChatSidebar
                    emailKorisnika={props.emailKorisnika}
                    chats={props.chats}
                    setChats={props.setChats}
                    korisnik={korisnik}
                    /* idVlasnika={idVlasnika} */
                    slikaKorisnika={slikaKorisnika}
                    kliknutiChat={kliknutiChat}
                    setKliknutiChat={setKliknutiChat}
                    setMessages={setMessages}
                    messages={messages}

                />

            </div>
        </div>
    )
}
