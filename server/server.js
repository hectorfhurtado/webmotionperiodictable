/* eslint no-console: off */

const http = require( 'http' );
const os   = require( 'os' );

const setHeader     = require( './headers/headers' );
const clasifyRoutes = require( './routes/routes' );

const PORT = 7027;
// const IP     = '52.50.14.166';
// const IP       = '192.168.0.4';    // Bogota development
// const IP_MONGO = '127.0.0.1';      // When no Wifi

function getLocalNetworkInterfaces()
{
    const networkInterfaces = os.networkInterfaces();
    console.assert( !!networkInterfaces, 'networkInterfaces', networkInterfaces );

    /* eslint no-console: off */
    console.log( 'Intenta acceder a traves de cualquiera de las siguientes direcciones: ' );

    let direcciones = [];

    /* eslint guard-for-in: off */
    for (const interfaz in networkInterfaces)
    {
        for (const subinterfaz of networkInterfaces[ interfaz ])
        {
            console.assert( !!subinterfaz, 'subinterfaz', subinterfaz );
            console.assert( 'internal' in subinterfaz, 'subinterfaz.internal', subinterfaz );
            console.assert( 'family' in subinterfaz, 'subinterfaz.family', subinterfaz );

            if (subinterfaz.internal === false && subinterfaz.family === 'IPv4')
            {
                const direccion = `http://${ subinterfaz.address }:${ PORT }`;

                console.log( direccion );
                direcciones.push( direccion );
            }
        }
    }
}

module.exports = function ()
{
    const server = http.createServer(( req, res ) =>
    {
        setHeader( req, res );
        clasifyRoutes( req, res );
    });

    server.listen( PORT );

    getLocalNetworkInterfaces(); 
};
