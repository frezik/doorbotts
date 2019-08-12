import * as act from './activator';


export class MultiActivator
{
    private activators: Array<act.Activator>;

    constructor(
        activators: Array<act.Activator>
    )
    {
        this.activators = activators;
    }


    activate(): Promise<any>
    {
        const promises = this.activators.map( (act) => {
            return act.activate();
        });
        return Promise.all( promises );
    }
}
