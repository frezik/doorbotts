/**
 * Represents data that was read from some source, usually to check if it 
 * passes authentication or not.
 */
export class ReadData
{
    public key: string;

    /**
     * @param key The data to pass around
     */
    constructor ( key: string )
    {
        this.key = key;
    }
}
