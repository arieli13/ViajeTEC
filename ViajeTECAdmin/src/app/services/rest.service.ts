import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';

@Injectable ()
export class RestService {
  private ServerURl = 'http://localhost:3000';

  constructor ( private http:Http ) {}

  private getOptions () {
    let header = new Headers ( { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } );
    let options = new RequestOptions ( { headers: header } );
    return options;
  }

  public requestGET ( link ) {
    return this.http.get (link, this.getOptions ())
      .map (( res: Response) => res.json())
      .catch (( error: any) => Observable.throw (error.json ().error || 'Server Error'));
  }

  public requestPOST ( link, body ) {
    return this.http.post ( link, body, this.getOptions ())
      .map (( res: Response ) => res.json ())
      .catch (( error: any) => Observable.throw (error.json ().error || 'Server Error'));
  }

  public requestPUT ( link, body ) {
    return this.http.put ( link, body, this.getOptions ())
      .map (( res: Response ) => res.json ())
      .catch (( error: any) => Observable.throw (error.json ().error || 'Server Error'));
  }

  public requestDELETE ( link ) {
    return this.http.delete ( link, this.getOptions ())
      .map (( res: Response ) => res.json ())
      .catch (( error: any) => Observable.throw (error.json ().error || 'Server Error'));
  }
}
