/**
 * @fileOverview An activator that does nothing (except fire off a callback)
 */
export class DoNothingActivator
{
    private callback: () => void;

    /**
     * Constructor.
     *
     * @param callback: {() => void} The callback to fire off when activated
     */
    constructor(
        callback: () => void
    )
    {
        this.callback = callback;
    }


    /**
     * Returns a Promise that, when resolved, fires off the callback
     *
     * @returns {Promise<any>}
     */
    activate(): Promise<any>
    {
        const promise = new Promise( (resolve, reject) => {
            this.callback();
            resolve( true );
        });
        return promise;
    }
}
