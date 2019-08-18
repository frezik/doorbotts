export {Activator} from './src/activator';
export {DoNothingActivator} from './src/activator_do_nothing';
export {MultiActivator} from './src/activator_multi';

export {Authenticator} from './src/authenticator';
export {AlwaysAuthenticator} from './src/authenticator_always';
export {MultiAuthenticator} from './src/authenticator_multi';

export {ReadData} from './src/read_data';

export {Reader} from './src/reader';
export {FHReader} from './src/reader_fh';
export {MockReader} from './src/reader_mock';


import * as Logger from 'logger';
export let log;

export function init_logger(
    file = null
): void
{
    // Don't do anything if it was already init'd
    if(! log ) {
        log = file
            ? Logger.createLogger( file )
            : Logger.createLogger();

        log.format = ( level, date, message ) => {
            return '[' + date.toISOString() + '] ' + message;
        };
    }
}
