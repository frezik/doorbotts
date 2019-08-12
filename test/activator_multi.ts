import * as tap from 'tap';
import * as activator from '../src/activator_do_nothing';
import * as activator_multi from '../src/activator_multi';

tap.plan( 2 );

const nothing1 = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
const nothing2 = new activator.DoNothingActivator( () => {
    tap.pass( "Callback made" );
});
const multi = new activator_multi.MultiActivator([
    nothing1
    ,nothing2
]);
const act_promise = multi.activate();

act_promise.then( (res) => {} );
