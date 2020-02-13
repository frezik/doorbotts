import * as Doorbot from '../index';

const INPUT_FILE = "test_data/database.json";


let reader = new Doorbot.FHReader(
    process.stdin
);
let auth = new Doorbot.JSONAuthenticator( INPUT_FILE );
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
