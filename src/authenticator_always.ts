import * as activator from './activator';
import * as read from './read_data';
import * as Doorbot from '../index';


/**
 * Authenticator that always fires off (or never does)
 */
export class AlwaysAuthenticator
{
    private act: activator.Activator;
    private is_allowed: boolean;

    /**
     * @param is_allowed Option (default true). If true, this authenticator will always pass.  If false, it will never pass.
     */
    constructor(
        is_allowed: boolean = true
    ) {
        this.is_allowed = is_allowed;
        Doorbot.init_logger();
    }


    /**
     * Sets the activator to fire off if authentication is successful
     *
     * @param act Activator to set
     */
    setActivator( act: activator.Activator ): void
    {
        Doorbot.log.info( '<AlwaysAuthenticator> Setting activator: '
            + act.constructor.name );
        this.act = act;
    }


    /**
     * Returns a Promise that, if authentication is correct, will fire off 
     * the set Activator.
     *
     * @param data Data to use for authentication
     */
    authenticate( data: read.ReadData ): Promise<any>
    {
        Doorbot.log.info( '<AlwaysAuthenticator> Allowing through: '
            + this.is_allowed );
        const promise = this.is_allowed
            ? this.act.activate()
            : new Promise( (resolve, reject) => {
                // Do nothing
                resolve( false );
            });
        return promise;
    }
}
