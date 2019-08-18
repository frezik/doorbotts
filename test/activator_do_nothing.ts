import * as tap from 'tap';
import * as activator from '../src/activator_do_nothing';
import * as Doorbot from '../index';
import * as os from 'os';

Doorbot.init_logger( os.tmpdir() + "/doorbot_test.log"  );


const act = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
const act_promise = act.activate();

act_promise.then( (res) => {} );
