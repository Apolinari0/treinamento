import { Component, inject, signal } from '@angular/core';
import { NewComponent } from "./modal/new/new.component";
import { TableComponent } from "./components/table/table.component";
import { SellerService } from './services/seller.service';
import { sellers } from './components/table.interface';

@Component({
  selector: 'app-seller',
  imports: [NewComponent, TableComponent],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css',
  standalone: true
})
export class SellerComponent {

  sellerService = inject(SellerService);
  sellers = signal<sellers[]>([]); 

  ngOnInit() {
    this.sellerService.getSellers().subscribe({
      next: (response) => {
        this.sellers.set(response.sellers);
        console.log('Sellers carregados:', this.sellers);
      },
      error: (err) => {
        console.error('Erro ao buscar sellers:', err);
      }
    });
  }
}
