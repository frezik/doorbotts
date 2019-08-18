import * as auth from './authenticator';
import * as reader from './reader';
import * as read from './read_data';
import * as Doorbot from '../index';


export class MockReader extends reader.Reader
{
    private mock_data: read.ReadData;


    constructor( mock_data: string )
    {
        super();
        this.mock_data = new read.ReadData( mock_data );
        Doorbot.init_logger();
    }


    runOnce(): Promise<any>
    {
        Doorbot.log.info( '<MockReader> Running with ' + this.mock_data );
        const promise
            = this.auth.authenticate( this.mock_data );
        return promise;
    }
}
