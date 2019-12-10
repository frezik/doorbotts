import * as Doorbot from '../index';

let reader = new Doorbot.FHReader(
    process.stdin
);
let auth = new Doorbot.AlwaysAuthenticator();
let act = new Doorbot.DoNothingActivator( () => {
    console.log( "Activate!" );
});

Doorbot.init_logger();
Doorbot.log.info( "Init" );
reader.setAuthenticator( auth );
auth.setActivator( act );
reader.init();

Doorbot.log.info( "Ready to read" );
reader
    .run()
    .then( () => {} );
