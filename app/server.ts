import App from './app';

App.init().then((app) => {
  app
    .listen(5001, () => {
      console.log('Server Started');
    })
    .on('error', (err) => {
      console.log("Server Can't be Started > ", err);
    });
});
