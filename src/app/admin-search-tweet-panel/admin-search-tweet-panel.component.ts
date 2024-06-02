import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-search-tweet-panel',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './admin-search-tweet-panel.component.html',
  styleUrl: './admin-search-tweet-panel.component.css'
})
export class AdminSearchTweetPanelComponent implements OnInit {
  
  displayedColumns: string[] = ['authorId', 'tweetId', 'authorUsername', 'authorViewingName', 'tweetContent', 'approve']
  response: any
  dataSource = []
  name = "";
  resultsLength = 0;
  content = "";
  nextPage: string|undefined;
  questId: string|undefined;


  constructor(private appComponent: AppComponent, private httpClient: HttpClient,  private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.appComponent.checkSuper()
    this.route.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.questId = params['id'];
      
      if (this.questId && params['content']) {
        this.content = decodeURIComponent(params['content']);
        this.search()
      } else {
        this.content = ""
      }
    });
  }

  search() {
    let url = this.appComponent.baseUrl + "/tweet/search";
    this.name = this.appComponent.name
    this.httpClient.post(url , this.createBody(), {headers: this.appComponent.getHeaders()}).subscribe(res => {
      this.response = res;
      this.dataSource = this.response.tweetList;
      this.nextPage = this.response.nextToken
      this.resultsLength = this.response.tweetCount;
    });
  }

  approveTweetQuest(username: string) {
    if (this.questId) {
      this.approveTweetQuestWithQuestId(username, this.questId);
    }
  }

  approveTweetQuestWithQuestId(username: string, quest: string) {
    let url = this.appComponent.baseUrl + "/quest/enroll/approve/" + username + "/" + quest
    this.httpClient.post(url , {}, {headers: this.appComponent.getHeaders()}).subscribe(res => {})
  }

  private createBody() {
    if(this.nextPage && this.nextPage.length > 0) {
      return {
        page: this.nextPage,
        content: this.content
      }
    }

    return {
      content: this.content
    }
  }
  
}