//plaintes

async function affOptpl(){
    const inscrits = await get('https://sos-doudous.onrender.com/inscriptions');
    for (let i = 0 ; i<inscrits.length ; i++){
        const opt = document.createElement("option");
        opt.textContent = inscrits[i].id;
        document.getElementById("sur").appendChild(opt);
    }
}
affOptpl();


document.getElementById("formpl").addEventListener("submit" , function(event){
    event.preventDefault();
    const payload = {
        com: document.getElementById("com").value,
        sur: document.getElementById("sur").value,
    }
    post('https://sos-doudous.onrender.com/plainte' , payload);
});


// Connection et affichages des plaintes

document.getElementById("con").addEventListener("submit", async function(event){
    event.preventDefault();
    const idCon = document.getElementById("idCon").value;
    const mdpCon = document.getElementById("mdpCon").value;
    const dataCon = await get(`https://sos-doudous.onrender.com/connexion/${encodeURIComponent(idCon)}/${encodeURIComponent(mdpCon)}`);
        if (dataCon){
            document.getElementById("ptpl").style.display = "block" ;
            document.getElementById("rej").style.display = "none" ;
            for (let i = 0 ; i<dataCon.length ; i++){
                const com = document.createElement("h3");
                const hr = document.createElement("hr");
                com.textContent = "Commentaire de la plainte : " + dataCon[i].com;
                document.getElementById("ptpl").appendChild(com);
                document.getElementById("ptpl").appendChild(hr);
            }
        } else {
            alert("Identifiants incorects.")
        }
    } 
);


//S'incrire (et afiichage des plaintes)
document.getElementById("rej").addEventListener("submit" , function(event){
    event.preventDefault();
    const payload = {
        id: document.getElementById("idRej").value,
        mdp: document.getElementById("mdpRej").value,
    }
    post('https://sos-doudous.onrender.com/inscription' , payload);
});



//pubs
async function run(){
    var lograna = document.getElementById("lograna");
    for (;;){
    await pub("Lograna: Les cookies de Référence", lograna);
    await pub("Ils ont même conquit les gentlemen", lograna);
    await pub("Le combo ultime crousti-moelleux-fondant", lograna);
    }
}
run();


async function pub(txt, marque){
    marque.innerHTML = txt;
    await new Promise(fct => setTimeout(fct, 5000));
}


document.getElementById("logranaL").addEventListener("click" , function(){
    window.location.href = "https://lograna.onrender.com";
});

