import * as tap from 'tap';
import * as auth from '../src/authenticator_always';
import * as activator from '../src/activator_do_nothing';
import * as multi from '../src/authenticator_multi';
import * as reader from '../src/read_data';
import * as Doorbot from '../index';
import * as os from 'os';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

tap.plan( 3 );


let activator_ran = false;

const hangs = new Doorbot.CallbackAuthenticator(
    (
        data: Doorbot.ReadData
    ): Promise<boolean> => {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                tap.ok( ! activator_ran, "Should have waited" );
                resolve( true );
            }, 5000 );
        });
    },
);
const always = new auth.AlwaysAuthenticator( true );
const multi_auth = new multi.MultiAuthenticator([
    hangs,
    always,
]);

const act = new activator.DoNothingActivator( () => {
    activator_ran = true;
    tap.pass( "Callback made" );
});
multi_auth.setActivator( act );


const data = new reader.ReadData( "foo" );
const auth_promise = multi_auth.authenticate( data );

tap.pass( "Starting" );
auth_promise.then( (res) => {} );
