import * as act from './activator';


/**
 * @fileOverview Fires off multiple activators at once
 */
export class MultiActivator
{
    private activators: Array<act.Activator>;

    /**
     * @constructor
     *
     * @param {Array<Activator>} Array of activators to fire off
     */
    constructor(
        activators: Array<act.Activator>
    )
    {
        this.activators = activators;
    }


    /**
     * Returns a promise that, when resolved, fires off all activators
     *
     * @returns {Promise<any>}
     */
    activate(): Promise<any>
    {
        const promises = this.activators.map( (act) => {
            return act.activate();
        });
        return Promise.all( promises );
    }
}
