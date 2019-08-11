import * as auth from './authenticator';


export abstract class Reader
{
    protected auth: auth.Authenticator;


    abstract runOnce(): Promise<any>;

    setAuthenticator( authenticator: auth.Authenticator ): void
    {
        this.auth = authenticator;
    }

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
