import * as activator from './activator';
import * as read from './read_data';
import * as Doorbot from '../index';


type Callback = (
    data: read.ReadData
) => Promise<boolean>;

/**
 * Authenticator that runs a callback
 */
export class CallbackAuthenticator
{
    private act: activator.Activator;
    private is_allowed: boolean;
    private callback: Callback;

    /**
     * @param callback The callback
     */
    constructor(
        callback: Callback
    ) {
        this.callback = callback;
        Doorbot.init_logger();
    }


    /**
     * Sets the activator to fire off if authentication is successful
     *
     * @param act Activator to set
     */
    setActivator( act: activator.Activator ): void
    {
        Doorbot.log.info( '<CallbackAuthenticator> Setting activator: '
            + act.constructor.name );
        this.act = act;
    }


    /**
     * Returns the Promise from the callback.
     *
     * @param data Data to use for authentication
     */
    authenticate( data: read.ReadData ): Promise<boolean>
    {
        Doorbot.log.info( '<CallbackAuthenticator> Executing callback' );
        return new Promise( (resolve, reject) => {
            this
                .callback( data )
                .then( (result) => {
                    if( result ) this.act.activate();
                    resolve( result );
                });
        });
    }
}
