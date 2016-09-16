

module.exports = ( req, res ) =>
{
    console.assert( req && 'url' in req, 'req: ', req );
    console.assert( res && 'setHeader' in res, 'res: ', res );

    if      ( /\/$|\.html$/.test(   req.url ))  res.setHeader( 'Content-type', 'text/html' );
    else if ( /\.js$/.test(         req.url ))  res.setHeader( 'Content-type', 'application/javascript' );
    else if ( /\.css$/.test(        req.url ))  res.setHeader( 'Content-type', 'text/css' );
    else if ( /\.json$/.test(       req.url ))  res.setHeader( 'Content-type', 'application/json' );
    else if ( /\.ico$/.test(        req.url ))  res.setHeader( 'Content-type', 'image/x-icon' );
    else if ( /\.svg$/.test(        req.url ))  res.setHeader( 'Content-type', 'image/svg+xml' );
    else if ( /\.png$/i.test(       req.url ))  res.setHeader( 'Content-type', 'image/png' );
    else                                        return;
};
