import http from 'http';

function attachListeners(server) {
    /* eslint-disable-next-line global-require */
    const { default: requestHandler } = require('./server');
    server.on('request', requestHandler);
}

const PORT = 3010;

const server = http.createServer();
attachListeners(server);
server.listen(PORT, (error) => {
    if (error) {
        console.log('Exception:', error);
        return;
    }

    console.log(`listening on ${PORT}...`);
});

if (module.hot) {
    module.hot.accept('./server', () => {
        server.removeAllListeners('request');

        attachListeners(server);
    });
}
