import * as tap from 'tap';
import * as auth from '../src/authenticator_always';
import * as activator from '../src/activator_do_nothing';
import * as reader from '../src/read_data';

// Authenticator should block the test in the callback
tap.plan( 1 );

const always = new auth.AlwaysAuthenticator( false );
const act = new activator.DoNothingActivator( () => {
    tap.fail( "Callback made" );
});
always.setActivator( act );

const data = new reader.ReadData( "foo" );
const auth_promise = always.authenticate( data );

tap.pass( "Starting promise" );
auth_promise.then( (res) => {} );
