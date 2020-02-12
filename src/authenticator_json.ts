import * as activator from './activator';
import * as read from './read_data';
import * as Doorbot from '../index';
import * as Fs from 'fs';

/**
 * Authenticator working off a JSON database
 */
export class JSONAuthenticator
{
    private act: activator.Activator;
    private database_file: string;

    /**
     * @param database_file The path to the database file
     */
    constructor(
        database_file: string
    ) {
        this.database_file = database_file;
        Doorbot.init_logger();
    }

    /**
     * Sets the activator to fire off if authentication is successful
     *
     * @param act Activator to set
     */
    setActivator( act: activator.Activator ): void
    {
        Doorbot.log.info( '<JSONAuthenticator> Setting activator: '
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
        const promise = new Promise( (resolve, reject) => {
            Fs.readFile( this.database_file, (err, json_data) => {
                if( err ) {
                    reject( err );
                }
                else {
                    let parsed_data = JSON.parse( json_data.toString() );
                    let key = data.key;

                    if( parsed_data[key] ) {
                        this.act.activate().then( () => {
                            resolve( true );
                        });
                    }
                    else {
                        resolve( false );
                    }
                }
            });
        });

        return promise;
    }
}
