import * as tap from 'tap';
import * as activator from '../src/do_nothing_activator';


const act = new activator.DoNothingActivator();
const act_promise = act.activate();

act_promise.then( ( result ) => {
    tap.pass( "Callback made" );
});
