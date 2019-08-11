import * as tap from 'tap';
import * as activator from '../src/activator_do_nothing';


const act = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
const act_promise = act.activate();

act_promise.then( (res) => {} );
