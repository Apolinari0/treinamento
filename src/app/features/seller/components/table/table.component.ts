import { Component, Input, input } from '@angular/core';
import { PoTableAction, PoTableColumn, PoTableModule } from "@po-ui/ng-components";
import { sellers } from '../table.interface';

@Component({
  selector: 'app-table',
  imports: [PoTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() items: sellers[] = []


  ngOnInit(){
    this.teste()
  }
  

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'code',
      type: 'string',
      label: 'codigo'
    },
    {
      property: 'name',
      type: 'string',
      label: 'nome'
    }
  ]


  teste(){
    console.log("oi")
    console.log(this.items)
  }


}
