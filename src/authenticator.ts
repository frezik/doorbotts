import * as activator from './activator';
import * as read from './read_data';


/**
 * @fileOverview Interface for authenticators, things that check if the user is OK
 */
export interface Authenticator
{
    /**
     * Sets the activator to fire off if authentication is successful
     *
     * @param {Activator} Activator to set
     */
    setActivator( act: activator.Activator ): void;

    /**
     * Returns a Promise that, if authentication is correct, will fire off 
     * the set Activator.
     *
     * @param {ReadData} Data to use for authentication
     */
    authenticate( data: read.ReadData ): Promise<any>;
}
