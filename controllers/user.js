const User = require('../models').User;
const Money = require('../models').Money;

module.exports = {

    async create(req, res) {
        let user1 = await User
        .create({
            username: req.body.username,
            money: req.body.money
        })
        .catch(error => res.status(400).send(error));
        await Money
        .create({
            money: user1.money,
            userId: user1.id,
        })
        .then(() => res.status(201).send(user1))
        .catch(error => res.status(400).send(error));

        // reading values in the terminal
        console.log(user1.username); 
        console.log(user1.id); 

    },

    async retreive(req, res) {
        await User
        .findByPk(req.params.userId,{
            raw: true,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },

    async checkData(req, res) {
        await User
        .auth(req.body.username, req.body.money)
        .then(user => res.status(201).send(user.username))
        .then(user => {
            console.log(user)
        })
        .catch(error => res.status(400).send(error));
    },

    async updateMoney(req, res) {
        await User
        .findByPk(req.params.userId, {
            include: [{
                model: Money,
                as: 'userMoney'
            }],
            raw: true,
            nest: true,
        })
        .then(function (users) {
            total = users.userMoney.money + users.money
            userId = users.id
        })
        .catch(error => res.status(400).send(error));
        await User
        .update({
            money: total,
        }, { 
            where: { id: userId, }
        })
        .then(() => res.status(200).send('ok'))
        .catch(error => res.status(400).send(error));
    },

    async changeUsername(req, res) {
        await User
        .findByPk(req.params.userId)
        .then(user => {
            if(!user){
                return res.status(404).send({
                    message: 'User not found'
                });
            }
            return user
            .update({
                username: req.body.username,
            })
            .then(() => res.status(200).send('ok'))
        })
        .catch(error => res.status(400).send(error));

    },

    async delete(req, res) {
        await User
        .findByPk(req.params.userId, {
            include: [{
                model: Money,
                as: 'userMoney'
            }],
            raw: true,
            nest: true,
        })
        .then(function (users) {
            userId = users.id
        })
        .catch(error => res.status(400).send(error));
        await User
        .destroy({ 
            where: { id: userId }
        })
        .then(() => res.status(200).send('ok'))
        .catch(error => res.status(400).send(error));
    },



}