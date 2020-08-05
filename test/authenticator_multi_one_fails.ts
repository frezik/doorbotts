import * as tap from 'tap';
import * as auth from '../src/authenticator_always';
import * as activator from '../src/activator_do_nothing';
import * as multi from '../src/authenticator_multi';
import * as reader from '../src/read_data';
import * as Doorbot from '../index';
import * as os from 'os';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

tap.plan( 2 );


const never1 = new auth.AlwaysAuthenticator( false );
const always1 = new auth.AlwaysAuthenticator( true );
const multi_auth = new multi.MultiAuthenticator([
    never1,
    always1,
]);

const act = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
multi_auth.setActivator( act );


const data = new reader.ReadData( "foo" );
const auth_promise = multi_auth.authenticate( data );

tap.pass( "Starting" );
auth_promise.then( (res) => {} );
