import * as auth from './authenticator';


/**
 * Base class for all readers
 */
export abstract class Reader
{
    /**
     * When your Reader gets data, pass it to `this.auth.authenticate( )` to 
     * set the rest of the system running.
     */
    protected auth: auth.Authenticator;


    /**
     * Returns a promise that will resolve with the data that was read.
     *
     * Readers that want to use an event-based interface should setup the 
     * event in an `init()` method. If so, have this return an empty promise.
     */
    abstract runOnce(): Promise<any>;

    /**
     * @param authenticator The Authenticator that will get data from this Reader
     */
    setAuthenticator( authenticator: auth.Authenticator ): void
    {
        this.auth = authenticator;
    }

    /**
     * Returns a promise that will call `runOnce()` in an infinte loop. Even 
     * if the given Reader uses an event-based interface, it should still 
     * return a NOP promise from `runOnce()`.
     */
    async run(): Promise<any>
    {
        const promise = new Promise( async (resolve, reject) => {
            while( true ) {
                await this.runOnce();
            }
        });
        return promise;
    }
}
