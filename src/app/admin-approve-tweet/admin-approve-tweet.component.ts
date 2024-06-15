import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-approve-tweet',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-approve-tweet.component.html',
  styleUrl: './admin-approve-tweet.component.css'
})
export class AdminApproveTweetComponent implements OnInit{

  questId = "";
  username = "";
  name = "";

  constructor(private appComponent: AppComponent, private httpClient: HttpClient){}
  
  ngOnInit(): void {
    this.appComponent.checkSuper()
    this.name = this.appComponent.name
  }


  approveTweet() {
    if (this.questId.length > 0 && this.username.length > 0 ) {
      this.approveTweetQuestWithQuestId(this.username, this.questId);
    }
  }

  approveTweetQuestWithQuestId(username: string, quest: string) {
    let url = this.appComponent.baseUrl + "/quest/enroll/approve/" + username + "/" + quest
    this.httpClient.post(url , {}).subscribe(res => {})
  }

}
