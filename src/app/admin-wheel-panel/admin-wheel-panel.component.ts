import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-wheel-panel',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './admin-wheel-panel.component.html',
  styleUrl: './admin-wheel-panel.component.css'
})
export class AdminWheelPanelComponent  implements OnInit {
  
  displayedColumns: string[] = ['name', 'thirdPartyType', 'operationType', 'prizeVolume', 'active', 'update', 'delete']
  response: any
  dataSource = []
  name = "";


  constructor(private appComponent: AppComponent, private httpClient: HttpClient ){}

  ngOnInit(): void {
    this.appComponent.checkSuper()
    let url = this.appComponent.baseUrl + "/quest/all";
    this.name = this.appComponent.name
    this.httpClient.get(url , {headers: this.appComponent.getHeaders()}).subscribe(res => {
      this.response = res;

      this.dataSource = this.response;
    });
  }

}