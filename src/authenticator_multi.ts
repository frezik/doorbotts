import * as activator from './activator';
import * as auth from './authenticator';
import * as mock_activator from './activator_do_nothing';
import * as read from './read_data';
import * as Doorbot from '../index';


/**
 * @fileOverview Authenticator that fires off multiple auth checks and, if any one of them is successful, fires off the Activator
 */
export class MultiAuthenticator
{
    private act: activator.Activator;
    private sub_auths: Array<auth.Authenticator>;

    /**
     * @constructor
     *
     * @param {Array<Authenticator>} List of authenticators to check
     */
    constructor(
        sub_auths: Array<auth.Authenticator> = []
    ) {
        this.sub_auths = sub_auths;
        Doorbot.init_logger();

        const activator = new mock_activator.DoNothingActivator( () => {
            // Do nothing
        });
        this.sub_auths.forEach( (auth) => {
            auth.setActivator( activator );
        });
    }

    /**
     * Sets the activator to fire off if authentication is successful
     *
     * @param {Activator} Activator to set
     */
    setActivator( act: activator.Activator ): void
    {
        Doorbot.log.info( '<MultiAuthenticator> Setting activator: '
            + act.constructor.name );
        this.act = act;
    }


    /**
     * Returns a Promise that, if any one of the sub-Authenticators pass, 
     * will fire off the set Activator.
     *
     * <strong>Note</strong>: There is no guarntee that authenticators will 
     * be hit in a given order.
     */
    authenticate( data: read.ReadData ): Promise<boolean>
    {
        Doorbot.log.info( '<MultiAuthenticator> Authenticating multiple ways' );

        let promises = this.sub_auths.map( (auth) => {
            Doorbot.log.info( '<MultiAuthenticator> Checking '
                + auth.constructor.name
                + ' against data: ' + data.key );
            return auth.authenticate( data );
        });

        return this.runPromises( promises )
            .then( (is_ok) => {
                if( is_ok ) {
                    Doorbot.log.info( '<MultiAuthenticator> At least one'
                        + ' authenticator passed, allowing' );
                    return this.act.activate();
                }
                else {
                    Doorbot.log.info( '<MultiAuthenticator> No'
                        + ' authenticator passed, rejecting' );
                    return new Promise( (resolve, reject) => {
                        // Do nothing
                        resolve( false );
                    });
                }
            });
    }


    // Runs all Promises in array, but unlike Promise.all(), short circuits 
    // as soon as one resolves with a true result. Unlike Promise.race(), 
    // won't stop for resolving with a false result.
    private async runPromises( promises: Array<Promise<any>> ): Promise<any>
    {
        let ret = false;

        for( let i = 0; i < promises.length; i++ ) {
            let next_promise = promises[i];
            let result = await next_promise;

            if( result ) {
                ret = true;
                break;
            }
        }

        return new Promise( (resolve, reject) => {
            resolve( ret );
        });
    }
}
