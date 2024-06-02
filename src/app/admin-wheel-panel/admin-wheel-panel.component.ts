import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-wheel-panel',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterOutlet, RouterLink],
  templateUrl: './admin-wheel-panel.component.html',
  styleUrl: './admin-wheel-panel.component.css'
})
export class AdminWheelPanelComponent  implements OnInit {
  
  displayedColumns: string[] = ['name', 'recurringTimeAsHours', 'usableCountInInterval', 'partySize', 'active', 'update', 'delete']
  response: any
  dataSource = []
  name = "";
  resultsLength = 0;


  constructor(private appComponent: AppComponent, private httpClient: HttpClient, private router: Router ){}

  ngOnInit(): void {
    this.appComponent.checkSuper()
    this.getWheels()
  }

  updateWheel(wheel: any) {
    this.router.navigate(['/admin/wheel'], {queryParams: {id: wheel.id}})
  }

  deleteWheel(wheel: any) {
    let url = this.appComponent.baseUrl + "/gamification/wheel/" + wheel.id;
    this.httpClient.delete(url, {headers: this.appComponent.getHeaders()}).subscribe(res => this.getWheels())
  }

  private getWheels() {
    let url = this.appComponent.baseUrl + "/gamification/wheel/all";
    this.name = this.appComponent.name
    this.httpClient.get(url , {headers: this.appComponent.getHeaders()}).subscribe(res => {
      this.response = res;
      this.dataSource = this.response;
      this.resultsLength = this.response.length
      
    });
  }
  
}