export class DoNothingActivator
{
    private callback: () => void;

    constructor(
        callback: () => void
    )
    {
        this.callback = callback;
    }


    activate(): Promise<any>
    {
        const promise = new Promise( (resolve, reject) => {
            this.callback();
            resolve( true );
        });
        return promise;
    }
}
