import * as auth from './authenticator';
import * as fs from 'fs';
import * as stream from 'stream';
import * as reader from './reader';
import * as read from './read_data';
import * as readline from 'readline';


export class FHReader extends reader.Reader
{
    private fh: stream.Readable;

    constructor(
        fh: stream.Readable = process.stdin
    )
    {
        super();
        this.fh = fh;
    }


    runOnce(): Promise<any>
    {

        const rl = readline.createInterface({
            input: this.fh
        });

        const promise = new Promise( (resolve, reject) => {
            rl.question( '', (line) => {
                const data = new read.ReadData( line );
                const auth_promise = this.auth.authenticate( data );
                resolve( auth_promise );
            });
        });
        return promise;
    }
}
