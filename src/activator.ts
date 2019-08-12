/**
 * @fileOverview Interface for activators, things that do stuff after a user is authenticated
 */
export interface Activator
{
    /**
     * Return a promise that, when resolved, will do the thing
     *
     * @returns {Promise<any>}
     */
    activate(): Promise<any>;
}
