import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-quest',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-quest.component.html',
  styleUrl: './admin-quest.component.css'
})
export class AdminQuestComponent implements OnInit {
  
  response: any
  name = "";

  update = false;

  id: string | undefined;
  questName = "";
  description = "";
  content = "";
  platform = "";
  operation = "";
  contentId = "";
  prize = 0;
  active = true;
  endingTime = "";
  startingTime = ""

  platforms = [{id: "TWITTER", text: "Twitter"}, {id: "WALLET", text: "Wallet"}]
  operations = [{id: "LIKE", text: "Like"}, {id: "RETWEET", text: "Retweet"}, {id: "SEND_POST", text: "Send post"}, {id: "ADD_USERNAME", text: "Add username"}, {id: "FOLLOW_ACCOUNT", text: "Follow account"}]

  constructor(private appComponent: AppComponent, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.appComponent.checkSuper()
    this.route.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.id = params['id'];
      if (this.id) {
        this.getQuest(this.id)
      } else {
        this.questName = "";
        this.description = "";
        this.content = "";
        this.platform = "";
        this.operation = "";
        this.contentId = "";
        this.prize = 0;
        this.active = true;
        this.startingTime = this.getFormattedDate(new Date())
        this.endingTime =  this.getFormattedDate(new Date())
        this.update = false;
      }
    });
  }


  private getQuest(id: string) {
    let url = this.appComponent.baseUrl + "/quest/single" + id;
    this.name = this.appComponent.name
    this.httpClient.get(url , {headers: this.appComponent.getHeaders()}).subscribe(res => {
      this.response = res;
      this.questName = this.response.name;
      this.description = this.response.description;
      this.content = this.response.content;
      this.platform = this.response.thirdPartyType;
      this.operation = this.response.operationType
      this.contentId = this.response.identifierOfOperation;
      this.prize = this.response.prizeVolume
      this.active = this.response.active;
      this.startingTime = this.getFormattedDate(new Date(this.response.startingTime))
      this.endingTime = this.getFormattedDate(new Date(this.response.endingTime))
      this.update = true;
    });
  }

  private getFormattedDate(date: Date) {
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return year  + "-" + month + "-" + day
  }

  save() {
    if(this.update && this.id) {
      this.updateQuest()
    } else {
      this.createQuest()
    }

  }

  private updateQuest() {
    let url = this.appComponent.baseUrl + "/quest/update";
    this.httpClient.put(url, this.createBody(), {headers: this.appComponent.getHeaders()}).subscribe(res => this.router.navigate(['/admin/quests']))
  }

  private createQuest() {
    let url = this.appComponent.baseUrl + "/quest/add";
    this.httpClient.post(url, this.createBody(), {headers: this.appComponent.getHeaders()}).subscribe(res => this.router.navigate(['/admin/quests']))
  }


  private createBody() {
    if (this.update && this.id) {
      return {
        id: this.id,
        name: this.questName,
        description: this.description,
        content: this.content,
        thirdPartyType: this.platform,
        operationType: this.operation,
        identifierOfOperation: this.contentId,
        prizeVolume: this.prize,
        active: this.active,
        startingTime: new Date(this.startingTime).getTime(),
        endingTime: new Date(this.endingTime).getTime(),
        platformIdentifierQuest: "ADD_USERNAME" === this.operation
      }
    }

    return {
      name: this.questName,
      description: this.description,
      content: this.content,
      thirdPartyType: this.platform,
      operationType: this.operation,
      identifierOfOperation: this.contentId,
      prizeVolume: this.prize,
      active: this.active,
      startingTime: new Date(this.startingTime).getTime(),
      endingTime: new Date(this.endingTime).getTime(),
      platformIdentifierQuest: "ADD_USERNAME" === this.operation
    }
  }

}
