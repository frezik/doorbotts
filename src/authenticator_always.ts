import * as activator from './activator';
import * as read from './read_data';


/**
 * @fileOverview Authenticator that always fires off (or never does)
 */
export class AlwaysAuthenticator
{
    private act: activator.Activator;
    private is_allowed: boolean;

    /**
     * @constructor
     *
     * @param {boolean} Option (default true). If true, this authenticator will always pass.  If false, it will never pass.
     */
    constructor(
        is_allowed: boolean = true
    ) {
        this.is_allowed = is_allowed;
    }


    /**
     * Sets the activator to fire off if authentication is successful
     *
     * @param {Activator} Activator to set
     */
    setActivator( act: activator.Activator ): void
    {
        this.act = act;
    }


    /**
     * Returns a Promise that, if authentication is correct, will fire off 
     * the set Activator.
     *
     * @param {ReadData} Data to use for authentication
     */
    authenticate( data: read.ReadData ): Promise<any>
    {
        const promise = this.is_allowed
            ? this.act.activate()
            : new Promise( (resolve, reject) => {
                // Do nothing
                resolve( false );
            });
        return promise;
    }
}
