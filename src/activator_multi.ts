import * as act from './activator';
import * as Doorbot from '../index';


/**
 * Fires off multiple activators at once
 */
export class MultiActivator
{
    private activators: Array<act.Activator>;

    /**
     * @param activators Array of activators to fire off
     */
    constructor(
        activators: Array<act.Activator>
    )
    {
        this.activators = activators;
        Doorbot.init_logger();
    }


    /**
     * Returns a promise that, when resolved, fires off all activators
     */
    activate(): Promise<boolean>
    {
        Doorbot.log.info( '<MultiActivator> Running multiple activators' );
        const promises = this.activators.map( (act) => {
            return act.activate();
        });
        return new Promise( (resolve, reject) => {
            Promise
                .all( promises )
                .then( () => resolve( true ) );
        });
    }
}
