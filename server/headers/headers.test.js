/* global describe */

const headers = require( './headers' );
const { expect }      = require( 'chai' );

describe( 'headers', () =>
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
            this.value  = value;
        },
    };

    it( 'debe dar el MIME para html o la ruta raiz', () =>
    {
        falsoReq.url = '/';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'text/html' );

        falsoReq.url = '/index.html';
        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'text/html' );
    });

    it( 'debe dar el MIME para JavaScript', () =>
    {
        falsoReq.url = '/index.js';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'application/javascript' );
    });

    it( 'debe dar el MIME para CSS', () =>
    {
        falsoReq.url = '/index.css';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'text/css' );
    });

    it( 'debe dar el MIME para PNG', () =>
    {
        falsoReq.url = '/index.png';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'image/png' );
    });

    it( 'debe dar el MIME para GIF', () =>
    {
        falsoReq.url = '/index.gif';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'image/gif' );
    });

    it( 'debe dar el MIME para PDF', () =>
    {
        falsoReq.url = '/index.pdf';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'application/pdf' );
    });

    it( 'debe dar el MIME para JSON o .fetch', () =>
    {
        falsoReq.url = '/index.json';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'application/json' );

        falsoReq.url = '/index.fetch';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'application/json' );
    });

    it( 'debe dar el MIME para .ico', () =>
    {
        falsoReq.url = '/favicon.ico';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'image/x-icon' );
    });

    it( 'debe dar el MIME para SVG', () =>
    {
        falsoReq.url = '/favicon.svg';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'image/svg+xml' );
    });

    it( 'debe dar el MIME para las fuentes ttf', () =>
    {
        falsoReq.url = '/favicon.ttf';

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.equal( 'Content-type' );
        expect( falsoRes.value ).to.equal( 'application/x-font-ttf' );
    });

    it( 'debe retornar nada cuando no conoce el MIME type', () =>
    {
        falsoReq.url = '/favicon.prueba';

        falsoRes.header = null;
        falsoRes.value    = null;

        headers( falsoReq, falsoRes );
        expect( falsoRes.header ).to.be.null;
        expect( falsoRes.value ).to.be.null;
    });
});