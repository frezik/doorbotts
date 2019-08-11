export class DoNothingActivator
{
    activate(): Promise<any>
    {
        const promise = new Promise( (resolve, reject) => {
            resolve( true );
        });
        return promise;
    }
}
