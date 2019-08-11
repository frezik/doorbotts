import * as auth from './authenticator';
import * as reader from './reader';
import * as read from './read_data';


export class MockReader extends reader.Reader
{
    private mock_data: read.ReadData;


    constructor( mock_data: string )
    {
        super();
        this.mock_data = new read.ReadData( mock_data );
    }


    runOnce(): Promise<any>
    {
        const promise
            = this.auth.authenticate( this.mock_data );
        return promise;
    }
}
