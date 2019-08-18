import * as tap from 'tap';
import * as auth from '../src/authenticator_always';
import * as activator from '../src/activator_do_nothing';
import * as multi from '../src/authenticator_multi';
import * as reader from '../src/read_data';
import * as Doorbot from '../index';
import * as os from 'os';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

tap.plan( 1 );


const always1 = new auth.AlwaysAuthenticator( false );
const always2 = new auth.AlwaysAuthenticator();
const multi_auth = new multi.MultiAuthenticator([
    always1
    ,always2,
]);

const act = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
multi_auth.setActivator( act );


const data = new reader.ReadData( "foo" );
const auth_promise = multi_auth.authenticate( data );

auth_promise.then( (res) => {} );
