import * as activator from './activator';
import * as read from './read_data';


export class AlwaysAuthenticator
{
    private act: activator.Activator;


    setActivator( act: activator.Activator ): void
    {
        this.act = act;
    }


    authenticate( data: read.ReadData ): Promise<any>
    {
        const promise = this.act.activate();
        return promise;
    }
}
