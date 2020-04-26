const usersCtrl = require('../controllers').users;

module.exports = (app) => {

  // post
  app.post('/api/signup', usersCtrl.create);
  app.post('/api/login', usersCtrl.checkData);
  app.post('/api/change/:userId', usersCtrl.changeUsername);

  // get
  app.get('/api/read/:userId', usersCtrl.retreive);
  app.get('/api/update/:userId', usersCtrl.updateMoney);
  app.get('/api/destroy/:userId', usersCtrl.delete);
  app.get('/api/reset', usersCtrl.wipeData);
}