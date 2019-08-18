import * as tap from 'tap';
import * as doorbot from '../index';
import * as os from 'os';

doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

tap.plan( 1 );


const always = new doorbot.AlwaysAuthenticator();
const act = new doorbot.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
always.setActivator( act );

const data = new doorbot.ReadData( "foo" );
const auth_promise = always.authenticate( data );

auth_promise.then( (res) => {} );
