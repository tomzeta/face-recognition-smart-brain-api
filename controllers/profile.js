const handleProfileGet = (req,res,db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(userId => {
        res.json(userId[0]);
    })
}

module.exports = {
    handleProfileGet: handleProfileGet
}