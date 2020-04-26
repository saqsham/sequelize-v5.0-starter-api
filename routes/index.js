const usersCtrl = require('../controllers').users;

module.exports = (app) => {
  app.post('/api/signup', usersCtrl.create);
  app.post('/api/login', usersCtrl.checkData);
  app.get('/api/read/:userId', usersCtrl.retreive);
  app.get('/api/update/:userId', usersCtrl.updateMoney);
  app.get('/api/destroy/:userId', usersCtrl.delete);
}