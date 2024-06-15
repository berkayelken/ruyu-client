import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-wheel',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-wheel.component.html',
  styleUrl: './admin-wheel.component.css'
})
export class AdminWheelComponent implements OnInit {

  response: any
  name = "";

  update = false;

  id: string | undefined;
  wheelName = "";
  recurringTimeAsHours = 0;
  usableCountInInterval = 0;
  prizePoolSize = 0;
  prizePartySize = 0;
  lowerBoundOfPrizeAsPowerOfFifty = 0;
  upperBoundOfPrizeAsPowerOfFifty = 0;
  active = true;

  constructor(private appComponent: AppComponent, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.appComponent.checkSuper()
    this.route.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.id = params['id'];
      if (this.id) {
        this.getWheel(this.id)
      } else {
        this.wheelName = "";
        this.recurringTimeAsHours = 0;
        this.usableCountInInterval = 0;
        this.prizePoolSize = 0;
        this.prizePartySize = 0;
        this.lowerBoundOfPrizeAsPowerOfFifty = 0;
        this.upperBoundOfPrizeAsPowerOfFifty = 0;
        this.active = true;
        this.update = false;
      }
    });
  }

  private getWheel(id: string) {
    let url = this.appComponent.baseUrl + "/gamification/wheel/single/" + id;
    this.name = this.appComponent.name
    this.httpClient.get(url).subscribe(res => {
      this.response = res;
      this.wheelName = this.response.name;
      this.recurringTimeAsHours = this.response.recurringTimeAsHours;
      this.usableCountInInterval = this.response.usableCountInInterval;
      this.prizePoolSize = this.response.prizes ? this.response.prizes.length : 0;
      this.prizePartySize = this.response.partySize;
      this.lowerBoundOfPrizeAsPowerOfFifty = 0;
      this.upperBoundOfPrizeAsPowerOfFifty = 0;
      this.active = this.response.active;
      this.update = true;
    });
  }


  save() {
    if (this.update && this.id) {
      this.updateWheel()
    } else {
      this.createWheel()
    }
  }

  private updateWheel() {
    let url = this.appComponent.baseUrl + "/gamification/wheel/update/" + this.id;
    this.httpClient.put(url, this.createBody()).subscribe(res => this.router.navigate(['/admin/wheels']))
  }

  private createWheel() {
    let url = this.appComponent.baseUrl + "/gamification/wheel/create";
    this.httpClient.post(url, this.createBody()).subscribe(res => this.router.navigate(['/admin/wheels']))
  }


  private createBody() {
    return {
      name: this.wheelName,
      recurringTimeAsHours: this.recurringTimeAsHours,
      usableCountInInterval: this.usableCountInInterval,
      prizePoolSize: this.prizePoolSize,
      prizePartySize: this.prizePartySize,
      lowerBoundOfPrizeAsPowerOfFifty: this.lowerBoundOfPrizeAsPowerOfFifty,
      upperBoundOfPrizeAsPowerOfFifty: this.upperBoundOfPrizeAsPowerOfFifty,
      active: this.active
    }
  }
}
