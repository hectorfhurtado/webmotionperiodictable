const fs   = require( 'fs' );
const path = require( 'path' );

const PUBLIC = '../../public';

module.exports = ( req, res ) =>
{
    console.assert( req && 'url' in req, 'req: ', req );
    console.assert( res && 'end' in res, 'res: ', res );
    
    const URL = req.url;

    // / o /index.html
    if (/\/(\d+)?$|\/index\.html$/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLIC + '/index.html' )).pipe( res );

    // **.js
    if (/\.js$/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLIC + URL )).pipe( res );

    // **.css
    if (/\.css$/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLIC + URL )).pipe( res );

    // explanations/*.json
    if (/\/explanations\/\w+\.json$/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLIC + '/page' + URL )).pipe( res );

    // templates
    if (/\/results\/\w+\.html/.test( URL ))
        fs.createReadStream( path.join( __dirname, PUBLIC + URL )).pipe( res );

    // .ico
    if (/\.ico$/.test( URL ))
    {
        res.statusCode = 200;
        res.end();
    }
};
