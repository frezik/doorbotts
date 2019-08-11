import * as activator from './activator';
import * as read from './read_data';


export interface Authenticator
{
    setActivator( act: activator.Activator ): void;
    authenticate( data: read.ReadData ): Promise<any>;
}
