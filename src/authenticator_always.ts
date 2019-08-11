import * as activator from './activator';
import * as read from './read_data';


export class AlwaysAuthenticator
{
    private act: activator.Activator;
    private is_allowed: boolean;

    constructor(
        is_allowed: boolean = true
    ) {
        this.is_allowed = is_allowed;
    }


    setActivator( act: activator.Activator ): void
    {
        this.act = act;
    }


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
