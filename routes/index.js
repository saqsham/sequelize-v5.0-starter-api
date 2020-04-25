const usersCtrl = require('../controllers').users;

module.exports = (app) => {
  app.post('/api/signup', usersCtrl.signup);
  app.post('/api/login', usersCtrl.login);
  app.get('/api/update/:userId', usersCtrl.updateMoney);
  app.get('/api/destroy/:userId', usersCtrl.delete);
}