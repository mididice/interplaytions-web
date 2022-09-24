export class Api {
    private url: string;
  
    async connect(first: number, second: number) : Promise<any> {
      const url = "/api/v2/midi/"+first+"/"+second+"/";
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      return fetch(url, options);
    }

    async combine() : Promise<any> {
      const url = "/api/v2/midi/combine/";
      const options = {
        method: "POST",
      };
      return fetch(url, options);
    }
}
  