import * as tap from 'tap';
import * as auth from '../src/authenticator_always';
import * as activator from '../src/activator_do_nothing';
import * as reader from '../src/reader_mock';
import * as Doorbot from '../index';
import * as os from 'os';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );


const mock = new reader.MockReader( "foo" );
const always = new auth.AlwaysAuthenticator();
const act = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});

mock.setAuthenticator( always );
always.setActivator( act );

const promise = mock.runOnce();
promise.then( (res) => {} );
