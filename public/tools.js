
//Get inscrits pour afficher plaintes/conexion/Get plaintes pour inscrits(param)
async function get(url){
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erreur :', error);
    } 
}


//Post plaintes ou Post nouveau compte
async function post (url , payload){
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        if(data){alert("Votre action a été réalisée")}
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}


async function sup(url){
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        if(data){alert("Votre action a bien été réalisée")}
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur :', error);
    }
}

