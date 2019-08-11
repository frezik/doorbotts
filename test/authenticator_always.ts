import * as tap from 'tap';
import * as auth from '../src/authenticator_always';
import * as activator from '../src/activator_do_nothing';
import * as reader from '../src/read_data';


const always = new auth.AlwaysAuthenticator();
const act = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
always.setActivator( act );

const data = new reader.ReadData( "foo" );
const auth_promise = always.authenticate( data );

auth_promise.then( (res) => {} );
