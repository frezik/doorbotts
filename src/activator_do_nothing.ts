import * as Doorbot from '../index';


/**
 * An activator that does nothing (except fire off a callback)
 */
export class DoNothingActivator
{
    private callback: () => void;

    /**
     * @param callback The callback to fire off when activated
     */
    constructor(
        callback: () => void
    )
    {
        this.callback = callback;
        Doorbot.init_logger();
    }


    /**
     * Returns a Promise that, when resolved, fires off the callback
     *
     * @returns {Promise<any>}
     */
    activate(): Promise<any>
    {
        Doorbot.log.info(
            '<DoNothingActivator> Activated, and doing nothing' );

        const promise = new Promise( (resolve, reject) => {
            this.callback();
            resolve( true );
        });
        return promise;
    }
}
