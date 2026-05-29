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


// Connection et affichages des plaintes (sup compte)

document.getElementById("con").addEventListener("submit", async function(event){
    event.preventDefault();
    const idCon = document.getElementById("idCon").value;
    const mdpCon = document.getElementById("mdpCon").value;
    const dataCon = await get(`https://sos-doudous.onrender.com/connexion/${encodeURIComponent(idCon)}/${encodeURIComponent(mdpCon)}`);
        if (dataCon){
            document.getElementById("divcon").style.display = "none" ;
            document.getElementById("ptpl").style.display = "block" ;
            document.getElementById("ide").style.display = "block" ;
            document.getElementById("rej").style.display = "none" ;

            const h1 = document.createElement("h1");
            const id = document.createElement("h3");
            const dip = document.createElement("h3");
            h1.textContent = "Bonjour, " + dataCon.inscrit.id;
            id.textContent = "Votre identifiant : " + dataCon.inscrit.id;
            dip.textContent = "Votre numéro de diplôme: " + dataCon.inscrit.dip;
            document.getElementById("ide").appendChild(h1);
            document.getElementById("ide").appendChild(id);
            document.getElementById("ide").appendChild(dip);
            for (let i = 0 ; i<dataCon.plaintesCon.length ; i++){
                const com = document.createElement("h3");
                const bt = document.createElement("button");
                const hr = document.createElement("hr");
                com.textContent = "Commentaire de la plainte : " + dataCon.plaintesCon[i].com;
                bt.textContent = "Mission accomplie !";
                // Supprimer une mission
                bt.addEventListener("click" , function() {
                    sup(`https://sos-doudous.onrender.com/supmis/${encodeURIComponent(dataCon.plaintesCon[i]._id)}`);
                });
                document.getElementById("ptpl").appendChild(com);
                document.getElementById("ptpl").appendChild(bt);
                document.getElementById("ptpl").appendChild(hr);
            }
            ///Supprimer un compte
            const bts = document.createElement("button");
            bts.textContent = "Supprimer le compte";
            bts.addEventListener("click" , function(){
                const verifsup = prompt("Ecrivez ' " + dataCon.inscrit.id + " ' pour valider la suppression.")
                if(verifsup === dataCon.inscrit.id){
                    sup(`https://sos-doudous.onrender.com/supcompte/${encodeURIComponent(idCon)}`);
                }
            })
            document.getElementById("ptpl").appendChild(bts);
        } else {
            alert("Identifiants incorects.")
        }
    });


//S'incrire
document.getElementById("rej").addEventListener("submit" , function(event){
    event.preventDefault();
    const payload = {
        id: document.getElementById("idRej").value,
        mdp: document.getElementById("mdpRej").value,
        plaintes: 0,
        dip: document.getElementById("dip").value,
    }
    post('https://sos-doudous.onrender.com/inscription' , payload);
    alert("Veuillez vous connecter avec vos identifiants pour accéder à votre page.");
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


document.getElementById("logranaL").addEventListener("click" , function() {
    window.location.href = "https://lograna.onrender.com";
});
