import * as auth from './authenticator';
import * as fs from 'fs';
import * as stream from 'stream';
import * as reader from './reader';
import * as read from './read_data';
import * as readline from 'readline';
import * as Doorbot from '../index';


/**
 * Reads data from a stream.
 */
export class FHReader extends reader.Reader
{
    private fh: stream.Readable;

    /**
     * @param fh The filehandle to read from. Defaults to `process.stdin`.
     */
    constructor(
        fh: stream.Readable = process.stdin
    )
    {
        super();
        this.fh = fh;
        Doorbot.init_logger();
    }

    /**
     * Init the read.
     */
    init(): void
    {
        Doorbot.log.info( '<FHReader> Begin init()' );
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

    /**
     * Does nothing; read handling is done through an event interface.
     */
    runOnce(): Promise<any>
    {
        // Since this is event based, nothing to do here
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                resolve( true );
            }, 100 );
        });
    }
}
