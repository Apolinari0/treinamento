import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sellers } from '../components/table.interface';
import { environment } from '../../../../environments/environment';
import { ProAppConfigService, ProSessionInfoService } from '@totvs/protheus-lib-core';

@Injectable({ providedIn: 'root' })
export class SellerService {

  private readonly url = `${environment.apiBaseUrl}`; // endpoint da API

   private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private proInfo: ProSessionInfoService,
    private proAppConfigService: ProAppConfigService,
  ) {
    if (!this.proAppConfigService.insideProtheus()) {
      this.proAppConfigService.loadAppConfig();

      const username = 'admin';
      const password = '123';
      const basicAuth = btoa(`${username}:${password}`);

      this.headers = new HttpHeaders({
        'Authorization': `Basic ${basicAuth}`,
        'Access-Control-Allow-Origin': '*'
      });

    } else {
      sessionStorage.setItem("insideProtheus", "1");

      const accessToken = (this.proInfo.getSessionInfo().erpToken as any).access_token;

      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*'
      });
    }
  }

  getSellers(): Observable<{sellers: sellers[]}> {
    return this.http.get<{sellers:sellers[]}>(this.url+'/treinamento/poui/v1/seller',{headers: this.headers});
  }


  
  createSeller(seller: sellers): Observable<sellers> {
    return this.http.post<sellers>(this.url+'/treinamento/poui/v1/seller', seller,{headers: this.headers});
  }


}
