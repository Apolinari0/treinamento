import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { 
  PoCheckboxGroupModule,
  PoFieldModule,
  PoButtonModule,
  PoModalModule,
  PoNotificationService,
  PoCheckboxGroupOption,
  PoComboOption,
  PoModalAction,
  PoModalComponent
} from '@po-ui/ng-components';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    FormsModule,
    PoModalModule,
    PoCheckboxGroupModule,
    PoFieldModule,
    PoButtonModule
  ],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  private poNotification = inject(PoNotificationService);
  private sellerService = inject(SellerService)

  @ViewChild('optionsForm', { static: true }) form!: NgForm;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  name: string = ''
  code: string = '';

  close: PoModalAction = {
    action: () => this.closeModal(),
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => this.proccessOrder(),
    label: 'Confirm'
  };

 

  openQuestionnaire() {
    this.poModal.open();
  }

  closeModal() {
    this.form.reset();
    this.poModal.close();
  }

  confirmModal() {
    this.proccessOrder();
  }

  restore() {
    this.form.reset();
  }

  private proccessOrder() {
    if (this.form.invalid) {
      this.poNotification.warning('Preencha os campos corretamente.');
      return;
    }

    this.confirm.loading = true;

    const newSeller = {
      code: this.code,
      name: this.name
    };

    this.sellerService.createSeller(newSeller).subscribe({
      next: (res) => {
        this.poNotification.success('Vendedor criado com sucesso!');
        this.confirm.loading = false;
        this.closeModal();
      },
      error: (err) => {
        this.poNotification.error('Erro ao criar vendedor.');
        console.error(err);
        this.confirm.loading = false;
      }
    });
  }
}
