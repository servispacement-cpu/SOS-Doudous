import dns from 'dns';
import express from 'express';
import mongoose from 'mongoose';
import cors  from 'cors';

//dns.setDefaultResultOrder('ipv4first');

// Create a new Express.js instance
const app = express();

 

// Set up middleware

app.use(express.json());

 

// Connect to the MongoDB database

mongoose.connect('mongodb://servispacement_db_user:test@ac-wrbrxfi-shard-00-00.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-01.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-02.r3itdqv.mongodb.net:27017/SOSdoudous?ssl=true&replicaSet=atlas-10s15u-shard-0&authSource=admin&appName=Cluster0', {
});

 

// Define a schema for our data

const SchemaI = new mongoose.Schema({
  id: String,
  mdp: String,
  plaintes: Number,
  dip: String,
});

const SchemaP = new mongoose.Schema({
  com: String,
  sur: String,
});
 

// Define a model based on the schema

const inscrits= mongoose.model('Inscrits', SchemaI);
const plaintes= mongoose.model('Plaintes', SchemaP);
 

// Define routes
app.use(cors()); 


//afficher inscrits pour plaintes
app.get('/inscriptions', async (req, res) => {
  const items = await inscrits.find({plaintes: { $lte: 2 }} , {mdp: 0,});  
  res.json(items);
});

// Créer une plainte
app.post('/plainte', async (req, res) => {
  try {
  const item = new plaintes(req.body);
  await item.save();

  await inscrits.updateOne(
    {id: req.body.sur},
    {$inc: {plaintes: 1},}
  )

  res.json(item);

  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


//Se connecter + recup plaintes
app.get('/connexion/:id/:mdp', async (req, res) => {
  const pId = decodeURIComponent(req.params.id);
  const pMdp = decodeURIComponent(req.params.mdp);

  const inscrit = await inscrits.findOne({id: pId , mdp: pMdp});
  if (inscrit){
    const plaintesCon = await plaintes.find({sur: inscrit.id,});
    return res.json({plaintesCon, inscrit});
  } else {
    return res.json(false);
  }
})


// S'inscrire
app.post('/inscription', async (req, res) => {
  try {
 const item = new inscrits(req.body);
  await item.save();
  
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

///Supprimer le compte

app.delete('/supcompte/:id', async (req, res) => {
  try {
    const id = decodeURIComponent(req.params.id);
    const compte = await inscrits.findOneAndDelete({id: id});
    await plaintes.deleteMany({sur: id})
    res.json(compte);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete('/supmis/:id', async (req, res) => {
  try {
    const id = decodeURIComponent(req.params.id);
    const plainte = await plaintes.findOneAndDelete({_id: id});
    res.json(plainte);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



app.use(express.static("public"));

// Start the server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});