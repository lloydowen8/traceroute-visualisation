/**
 * Class used to find the location of ip addresses
 */
export class ipGeolocator {
    apiKey: string;
    constructor(key:string){
        this.apiKey = key;
        console.log(key);
    }

    /**
     * @param ipAddress - the ip address used to get location
     * @returns Something
     */
    public async getGeolocation(ipAddress : string) : Promise<void | Response | string[]>{
        return fetch("http://api.ipstack.com/" + ipAddress + "?access_key=" + this.apiKey)
            .then(response => response.json())
            .then(data => {
                const lat = data.latitude;
                const long = data.longitude;
                return [lat, long];
            });
    }
}
