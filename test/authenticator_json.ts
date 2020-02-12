import * as tap from 'tap';
import * as doorbot from '../index';
import * as os from 'os';

doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

const INPUT_FILE = "test_data/database.json";

tap.plan( 1 );


const json = new doorbot.JSONAuthenticator( INPUT_FILE );
const act = new doorbot.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
json.setActivator( act );

const data = new doorbot.ReadData( "1234567890" );
const auth_promise = json.authenticate( data );

auth_promise.then( (res) => {} );
