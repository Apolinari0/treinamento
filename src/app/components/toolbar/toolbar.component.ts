import { Component } from '@angular/core';
import { PoToolbarAction, PoToolbarModule } from '@po-ui/ng-components';
import { ProAppConfigService } from '@totvs/protheus-lib-core';

@Component({
  selector: 'app-toolbar',
  imports: [PoToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  
   constructor(private proAppConfigService: ProAppConfigService) {
    if (!this.proAppConfigService.insideProtheus()) {
        this.proAppConfigService.loadAppConfig();
    } else {
      sessionStorage.setItem("insideProtheus", "1");
    }
  }
  
  
    private closeApp() {
      if (this.proAppConfigService.insideProtheus()) {
        sessionStorage.clear()
        this.proAppConfigService.callAppClose();
      } else {
        alert('O App não está sendo executado dentro do Protheus.');
      }
    }

  profileActions: Array<PoToolbarAction> = [
   { icon: 'an an-sign-out', label: 'Sair', type: 'danger', separator: true, action: (item: PoToolbarAction) => this.closeApp() }
  ];

}
