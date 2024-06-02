import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-quest-panel',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './admin-quest-panel.component.html',
  styleUrl: './admin-quest-panel.component.css'
})
export class AdminQuestPanelComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'thirdPartyType', 'operationType', 'prizeVolume', 'active', 'update', 'delete', 'search', 'approveSingle']
  response: any
  dataSource = []
  name = "";
  resultsLength = 0;


  constructor(private appComponent: AppComponent, private httpClient: HttpClient, private router: Router ){}

  ngOnInit(): void {
    this.appComponent.checkSuper()
    this.getQuests()
  }

  updateQuest(quest: any) {
    this.router.navigate(['/admin/quest'], {queryParams: {id: quest.id}})
  }

  deleteQuest(quest: any) {
    let url = this.appComponent.baseUrl + "/quest/" + quest.id;
    this.httpClient.delete(url, {headers: this.appComponent.getHeaders()}).subscribe(res => this.getQuests())
  }

  private getQuests() {
    let url = this.appComponent.baseUrl + "/quest/all";
    this.name = this.appComponent.name
    this.httpClient.get(url , {headers: this.appComponent.getHeaders()}).subscribe(res => {
      this.response = res;
      this.dataSource = this.response;
      this.resultsLength = this.dataSource.length
    });
  }

  searchTweet(quest: any) {
    this.router.navigate(['/admin/search/tweet'], {queryParams: {id: quest.id, content: quest.content}})
  }

  isApprovableContent(quest: any) {
    return "SEND_POST" === quest.operationType;
  }

  approveForSingle(quest: any) {
    this.router.navigate(['/admin/approve/tweet'], {queryParams: {id: quest.id}})
  }

}
