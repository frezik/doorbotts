import * as auth from './authenticator';
import * as fs from 'fs';
import * as stream from 'stream';
import * as reader from './reader';
import * as read from './read_data';
import * as readline from 'readline';
import * as Doorbot from '../index';


export class FHReader extends reader.Reader
{
    private fh: stream.Readable;

    constructor(
        fh: stream.Readable = process.stdin
    )
    {
        super();
        this.fh = fh;
        Doorbot.init_logger();
    }

    init(): void
    {
        const rl = readline.createInterface({
            input: this.fh
        });

        rl.on( 'line', (line) => {
            Doorbot.log.info( '<FHReader> Read from filehandle: ' + line );

            const data = new read.ReadData( line );
            const auth_promise = this.auth.authenticate( data );
            auth_promise.then( () => {} );
        });
    }

    runOnce(): Promise<any>
    {
        // Since this is event based, nothing to do here
        return new Promise( (resolve, reject) => {
            resolve( true );
        });
    }
}
