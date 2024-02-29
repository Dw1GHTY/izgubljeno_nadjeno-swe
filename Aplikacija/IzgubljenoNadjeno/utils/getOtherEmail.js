const getOtherEmail = (users, currentUser) => { //lista korisnika i trenutni korisnik
    return users?.filter(user => user !== currentUser?.email)[0];
}

export default getOtherEmail;