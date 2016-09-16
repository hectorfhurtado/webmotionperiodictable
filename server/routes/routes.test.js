
const routes       = require( './routes' );
const { expect }   = require( 'chai' );
const { Writable } = require( 'stream' );

describe( 'routes', () =>
{
    let falsoReq =
    {
        url: '',
    };

    let falsoRes =
    {
        setHeader( header, value )
        {
            this.header = header,
            this.value    = value;
        },

        write( chunk )
        {
            this.data += chunk;
        },

        end( chunk )
        {
            this.data += chunk;
            this.ready = true;
        },
    };

    it( 'deberia enviar el parametro integrity en el script', done =>
    {
        falsoRes.ready = false;
        falsoRes.data = '';

        falsoReq.url = '/index.html';

        routes( falsoReq, falsoRes );


        setTimeout( function recursive()
        {
            if (falsoRes.ready)
            {
                expect( falsoRes.data ).to.match( /integrity=/ );
                done();
            }

            else setTimeout( recursive, 100 );
        }, 100 );
    });

    it( 'deberia enviar informacion con archivos javaScript', done =>
    {
        let falsoWritableStream = new Writable({

            write( chunk, encoding, callback )
            {
                expect( chunk ).to.not.be.empty;
                done();
            },
        });

        falsoReq.url = '/index.js';

        routes( falsoReq, falsoWritableStream );
    });

    it( 'deberia solo escribir el statusCode porque no estoy enviando ningun icono', done =>
    {
        falsoRes.ready = false;
        falsoRes.data = '';

        falsoReq.url = '/favicon.ico';

        routes( falsoReq, falsoRes );

        setTimeout( function recursive()
        {
            if (falsoRes.ready)
            {
                expect( falsoRes.statusCode ).to.equal( 200 );
                done();
            }

            else setTimeout( recursive, 10 );
        }, 10 );
    });
});