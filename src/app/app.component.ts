import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';

// @ts-ignore
const $: any = window['$']

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  server = "http://139.59.157.143:80"
  twitterLoginFirstPart = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=WEJwTVdGXzFCWjF1c3dJTk1iZGw6MTpjaQ&redirect_uri="
  twitterLoginSecondPart = "&scope=tweet.read+users.read&state=state&code_challenge=challenge&code_challenge_method=plain"

  twitterLoginPath = this.twitterLoginFirstPart + encodeURIComponent(this.server) + this.twitterLoginSecondPart

  authCookiePath = "RUYU_AUTH_CREDENTIALS"
  title = 'ruyu-client';
  baseUrl = "http://139.59.157.143:8080/api"
  name = ""
  authResponse: any;

  nextAvailableTime = 0;
  currentPrize = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  wheelAvailable = true;
  wheelContentResponse: any;
  questResponse: any;
  wheelValues: Array<WheelItem> = [];

  noLoggedInQuests = [{ "title": "Login Needed", "text": "You cannot see the quests." }, { "title": "Login Needed", "text": "You cannot see the quests." }, { "title": "Login Needed", "text": "You cannot see the quests." }, { "title": "Login Needed", "text": "You cannot see the quests." }]
  level = 1;
  tokenBalance = 0;
  quests: Array<Quest> = [];
  code: string | undefined;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.collectUserContext();
    this.name = this.getName()
  }

  loginViaTwitter() {
    window.open(this.twitterLoginPath);
  }

  private collectUserContext() {
    this.route.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.code = params['code'];
      if (this.code) {
        this.httpClient.get(this.baseUrl + "/auth/sign/in/twitter/" + this.code, {
          headers: this.getDefaultHeaders()
        }).subscribe((res) => {
          this.authResponse = res;
          this.name = this.authResponse.name;
          this.setCookie();
        })
        this.router.navigate([], {
          queryParams: {
            'code': null,
            'state': null
          },
          queryParamsHandling: 'merge'
        })
      }
    });
  }

  isSignedIn() {
    let token = this.getToken()
    if (token) {
      return true
    }
    return false
  }

  enroll(quest: Quest) {
    if (this.isEnrollStatus(quest) || this.isSuccessStatus(quest)) {
      return
    }
    if (quest.operationType === "ADD_USERNAME") {
      this.callAddUserName(quest)
    } else {
      this.callEnrollApi(quest)
    }
  }

  isEnrollStatus(quest: Quest) {
    return "ENROLLED" === quest.statusForUser
  }

  isSuccessStatus(quest: Quest) {
    return "SUCCEED" === quest.statusForUser
  }

  private callAddUserName(quest: Quest) {
    let url = this.baseUrl + "/quest/enroll/add/platform" + quest.id
    let headers = this.getHeaders();
    let body = {questId: quest.id, platform: quest.thirdPartyType, identifierForPlatform: ""}// this will be added
    this.httpClient.post(url, body, {
      headers: headers
    }).subscribe(res => {})
  }

  private callEnrollApi(quest: Quest) {
    let url = this.baseUrl + "/quest/enroll/duty/" + quest.id
    let headers = this.getHeaders();
    this.httpClient.post(url, {}, {
      headers: headers
    }).subscribe(res => {
      window.open(quest.redirectUrl, "_blank");
    })
  }

  openQuestModal() {
    let headers = this.getHeaders();
    let url = this.baseUrl + "/quest/user";
    this.httpClient.get(url, {
      headers: headers
    }).subscribe((res) => {
      this.questResponse = res;
      let user = this.questResponse.user;
      this.level = user.level;
      this.tokenBalance = user.balance;
      this.quests = []
      for (let activeQuest of this.questResponse.active) {
        let questItem: Quest = {id: activeQuest.id, name: activeQuest.name, description: activeQuest.description, thirdPartyType: activeQuest.thirdPartyType,
          operationType: activeQuest.operationType, prizeVolume: activeQuest.prizeVolume, 
          redirectUrl: activeQuest.redirectUrl, statusForUser: activeQuest.statusForUser}
          this.quests.push(questItem)
      }
    });

  }

  openWheelModal() {
    let headers = this.getHeaders();
    let url = this.baseUrl + "/gamification/selected/wheel";
    this.httpClient.get(url, {
      headers: headers
    }).subscribe((res) => {
      this.wheelValues = []
      this.wheelContentResponse = res
      let selectedPrizesParty = this.wheelContentResponse.selectedPrizesParty;
      let index = 0;
      for(let wheelItemValue of selectedPrizesParty) {
        let wheelItemForUI: WheelItem = { id: index, className: "number position-" + index, value: wheelItemValue };
        index++;
        this.wheelValues.push(wheelItemForUI);
      }
      this.nextAvailableTime = this.wheelContentResponse.nextTurningTimeCounter + new Date().getTime()
      this.wheelAvailable = this.wheelContentResponse.wheelTurningAvailable
      this.currentPrize = this.wheelContentResponse.totalBenefit
      if(!this.wheelAvailable) {
        this.setTimerForWheel()
      }
     
      $(document.getElementById('questModal')).modal('hide');
      $(document.getElementById('wheelModal')).modal('show');
    })
  }

  checkSuper() {
    let url = this.baseUrl + "/auth/check/super/type";
    this.httpClient.get(url , {headers: this.getHeaders()}).subscribe(res => {
      if (!res) {
        this.goHome()
      }
    }, err => this.goHome())
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  getHeaders() : HttpHeaders {
    let headers = this.getDefaultHeaders()
    headers = headers.set("auth-token", "Bearer " + this.getToken());
    headers = headers.set("special", "Bearer " + this.getToken());
    return headers
  }

  private getDefaultHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    headers = headers.set("Accept", "application/json");
    return headers;
  }

  goBackToFirstModal() {
    $(document.getElementById('questModal')).modal('show');
    $(document.getElementById('wheelModal')).modal('hide');
  }

  turnWheel() {
    if(this.wheelAvailable) {
      this.callTurnWheel()
    }
  }

  private rotateWheel(deg: number, transition: string) {
    let wheel = this.document.getElementById('wheel_spinner')!;
    let wheel_slice_container = this.document.getElementById('wheel_slice_container')!;
    let value = Math.ceil(deg);
    let sliceVal = value + 45;
    
    wheel.style.transition = transition;
    wheel.style.transform = "rotate(" + value + "deg)";
    wheel_slice_container.style.transition = transition;
    wheel_slice_container.style.transform = "rotate(" + sliceVal + "deg)";
  }

  private callTurnWheel() {
    let url = this.baseUrl + "/gamification/selected/wheel/turn";
    let headers = this.getHeaders();
    this.httpClient.post(url, {}, {
      headers: headers
    }).subscribe(res => {
      this.wheelContentResponse = res
      this.currentPrize = this.wheelContentResponse.currentPrize ? this.wheelContentResponse.currentPrize : 0
      this.tokenBalance += this.currentPrize;
      this.nextAvailableTime = this.wheelContentResponse.nextTurningTimeCounter + new Date().getTime()
      let index = this.wheelContentResponse.currentIndex;
      let deg = 30 * index + 3600
      this.rotateWheel(-deg, "transform 5s ease-out")
       setTimeout(() => {
        this.wheelAvailable = this.wheelContentResponse.wheelTurningAvailable
        if(!this.wheelAvailable) {
          this.setTimerForWheel()
        }
      },5500)
    })
  }

  private setTimerForWheel() {
    var interval = setInterval(() => {
      let distance = this.nextAvailableTime - new Date().getTime()
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance <= 0) {
        this.wheelAvailable = true
        clearInterval(interval)
      }
    })
  }

  private getToken() {
    let cookieToken = this.getCookie("token")
    if (cookieToken && cookieToken.length > 0) {
      return cookieToken;
    }

    let localStorageToken = this.getItemFromLocalStorage("token")
    let expiresAtStr = this.getItemFromLocalStorage("expiresAt");
    let expiresAt = Number.parseInt(expiresAtStr ? expiresAtStr : '0')

    if (expiresAt > new Date().getTime() && localStorageToken && localStorageToken.length > 0) {
      return localStorageToken;
    } else {
        this.deleteFromLocalStorage("token")
        this.deleteFromLocalStorage("name")
        this.deleteFromLocalStorage("expiresAt")
    }

    return ''
  }

  private getName() {
    let cookieName = this.getCookie("name")
    if (cookieName && cookieName.length > 0) {
      return cookieName;
    }

    let localStorageName = this.getItemFromLocalStorage("name")
    if (localStorageName && localStorageName.length > 0) {
      return localStorageName;
    }

    return ''
  }

  private getItemFromLocalStorage(fieldName: string){
    return this.document.defaultView?.localStorage.getItem(fieldName)
  } 

  private deleteFromLocalStorage(fieldName: string) {
    this.document.defaultView?.localStorage.removeItem(fieldName);
  }


  private getCookie(name: string) {
    let ca: Array<string> = this.document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  private setCookie() {
    let d: Date = new Date();
    d.setTime(d.getTime() + this.authResponse.expiresAt);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = `; path=${this.authCookiePath}`;
    this.document.cookie = `name=${this.authResponse.name}; ${expires}${cpath}`;
    this.document.cookie = `imageUrl=${this.authResponse.imageUrl}; ${expires}${cpath}`;
    this.document.cookie = `token=${this.authResponse.token}; ${expires}${cpath}`;
    this.document.defaultView?.localStorage.setItem("token", this.authResponse.token)
    this.document.defaultView?.localStorage.setItem("name", this.authResponse.name)
    let time = d.getTime()
    this.document.defaultView?.localStorage.setItem("expiresAt", time ? time.toString() : '0')
  }

}

export interface Quest {
  id: string;
  name: string;
  description: string;
  operationType: string;
  thirdPartyType: string;
  prizeVolume: number;
  redirectUrl: string;
  statusForUser: string;
}

export interface WheelItem {
  id: number;
  className: string;
  value: number;
}

export interface SelectedWheel {
  totalBenefit: number;
  earnedPrizes: [Prize];
  selectedPrizesParty: [Prize];
  wheelTurningAvailable: boolean;
  nextTurningTimeCounter: number;
  currentPrize: number;
  inactiveWheel: false;
}

export interface Prize {
  index: string;
  value: number;
}
