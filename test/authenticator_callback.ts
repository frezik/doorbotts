import * as tap from 'tap';
import * as doorbot from '../index';
import * as os from 'os';

doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );

tap.plan( 2 );


const callback = new doorbot.CallbackAuthenticator(
    (
        data: doorbot.ReadData
    ): Promise<boolean> => {
        tap.pass( "Callback auth made" );
        return new Promise( (resolve, reject) => {
            resolve( true );
        });
    },
);
const act = new doorbot.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
callback.setActivator( act );

const data = new doorbot.ReadData( "foo" );
const auth_promise = callback.authenticate( data );

auth_promise.then( (res) => {} );
