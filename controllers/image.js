const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '55cee660665d48b694311b8435c90695'
   });

const handleClarifaiCall = (req,res) => {  
    const {input} = req.body;
    app.models.predict(
    'a403429f2ddf4b49b307e318f00e528b',
    input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImagePost = (req,res, db) => {
    const { id } = req.body;
    db('users').where('id','=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    }).catch(err => {
        res.status(400).json('unable to get entries')
    })
}

module.exports = {
    handleImagePost: handleImagePost,
    handleClarifaiCall : handleClarifaiCall
}