import * as activator from './activator';
import * as auth from './authenticator';
import * as mock_activator from './activator_do_nothing';
import * as read from './read_data';


export class MultiAuthenticator
{
    private act: activator.Activator;
    private sub_auths: Array<auth.Authenticator>;

    constructor(
        sub_auths: Array<auth.Authenticator> = []
    ) {
        this.sub_auths = sub_auths;

        const activator = new mock_activator.DoNothingActivator( () => {
            // Do nothing
        });
        this.sub_auths.forEach( (auth) => {
            auth.setActivator( activator );
        });
    }

    setActivator( act: activator.Activator ): void
    {
        this.act = act;
    }


    authenticate( data: read.ReadData ): Promise<any>
    {
        let promises = this.sub_auths.map( (auth) => {
            return auth.authenticate( data );
        });
        return Promise
            .all( promises )
            .then( (values) => {
                if( values.filter( (_) => _ ).length > 0 ) {
                    return this.act.activate();
                }
                else {
                    return new Promise( (resolve, reject) => {
                        // Do nothing
                        resolve( false );
                    });
                }
            });
    }
}
