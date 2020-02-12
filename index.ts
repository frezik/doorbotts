export {Activator} from './src/activator';
export {DoNothingActivator} from './src/activator_do_nothing';
export {MultiActivator} from './src/activator_multi';

export {Authenticator} from './src/authenticator';
export {AlwaysAuthenticator} from './src/authenticator_always';
export {JSONAuthenticator} from './src/authenticator_json';
export {MultiAuthenticator} from './src/authenticator_multi';

export {ReadData} from './src/read_data';

export {Reader} from './src/reader';
export {FHReader} from './src/reader_fh';
export {MockReader} from './src/reader_mock';


import * as Logger from 'winston';
export let log;

export function init_logger(
    file = null
): void
{
    // Don't do anything if it was already init'd
    if(! log ) {
        const transport = file
            ? new Logger.transports.File({ filename: file })
            : new Logger.transports.Console({});
        const format = Logger.format.printf(
            ({ level, message, label, timestamp }) => {
                let date = new Date();
                let datetime = date.toISOString();
                return `[${datetime}] ${message}`;
            }
        );

        log = Logger.createLogger({
            level: 'info'
            ,format: format
            ,defaultMeta: { service: 'user-service' }
            ,transports: [
                transport
            ]
        });
    }
}
