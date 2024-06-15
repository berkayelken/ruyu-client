import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet, ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs/operators';

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
  server = "https://www.ruyui.com"
  twitterLoginFirstPart = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=WEJwTVdGXzFCWjF1c3dJTk1iZGw6MTpjaQ&redirect_uri="
  twitterLoginSecondPart = "&scope=tweet.read+users.read&state=state&code_challenge=challenge&code_challenge_method=plain"

  twitterLoginPath = this.twitterLoginFirstPart + encodeURIComponent(this.server) + this.twitterLoginSecondPart

  noFooterPages: Array<any> = [
  
  { path: "/admin", startsWith: true }]


  authCookiePath = "RUYU_AUTH_CREDENTIALS"
  title = 'ruyu-client';
  baseUrl = "https://139.59.157.143:8080/api"
  name = ""
  imageUrl = "";
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
  
  constructor(private route: ActivatedRoute,  private titleService: Title,
     private httpClient: HttpClient, private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.collectUserContext();
    this.name = this.getName();
    this.imageUrl = this.getImageUrl();
    this.hideLoader();
    this.setPageTitle();
  }
  
  setPageTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((title: string | null) => {
        if (title) {
          this.titleService.setTitle(`${title} - RUYUI STUDIOS`);
        } else {
          this.titleService.setTitle('RUYUI STUDIOS');
        }
      });
  }

    hideLoader() {
      setTimeout(() => {
        const loader = this.document.getElementById('loader');
        if (loader) {
          loader.style.display = 'none';
        }
      }, 1500); // Adjust the delay as needed (1000 ms = 1 second)
    }

  loginViaTwitter() {
    window.open(this.twitterLoginPath);
  }

  private collectUserContext() {
    this.route.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.code = params['code'];
      if (this.code) {
        this.httpClient.get(this.baseUrl + "/auth/sign/in/twitter/" + this.code).subscribe((res) => {
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
  
    let body = { questId: quest.id, platform: quest.thirdPartyType, identifierForPlatform: "" }// this will be added
    this.httpClient.post(url, body).subscribe(res => { })
  }

  private callEnrollApi(quest: Quest) {
    let url = this.baseUrl + "/quest/enroll/duty/" + quest.id
    this.httpClient.post(url, {}).subscribe(res => {
      window.open(quest.redirectUrl, "_blank");
    })
  }

  openQuestModal() {
    let url = this.baseUrl + "/quest/user";
    this.httpClient.get(url).subscribe((res) => {
      this.questResponse = res;
      let user = this.questResponse.user;
      this.level = user.level;
      this.tokenBalance = user.balance;
      this.quests = []
      for (let activeQuest of this.questResponse.active) {
        let questItem: Quest = {
          id: activeQuest.id, name: activeQuest.name, description: activeQuest.description, thirdPartyType: activeQuest.thirdPartyType,
          operationType: activeQuest.operationType, prizeVolume: activeQuest.prizeVolume,
          redirectUrl: activeQuest.redirectUrl, statusForUser: activeQuest.statusForUser
        }
        this.quests.push(questItem)
      }
    });

  }

  openWheelModal() {
    let url = this.baseUrl + "/gamification/selected/wheel";
    this.httpClient.get(url).subscribe((res) => {
      this.wheelValues = []
      this.wheelContentResponse = res
      let selectedPrizesParty = this.wheelContentResponse.selectedPrizesParty;
      let index = 0;
      for (let wheelItemValue of selectedPrizesParty) {
        let wheelItemForUI: WheelItem = { id: index, className: "number position-" + index, value: wheelItemValue };
        index++;
        this.wheelValues.push(wheelItemForUI);
      }
      this.nextAvailableTime = this.wheelContentResponse.nextTurningTimeCounter + new Date().getTime()
      this.wheelAvailable = this.wheelContentResponse.wheelTurningAvailable
      this.currentPrize = this.wheelContentResponse.totalBenefit
      if (!this.wheelAvailable) {
        this.setTimerForWheel()
      }

      $(document.getElementById('questModal')).modal('hide');
      $(document.getElementById('wheelModal')).modal('show');
    })
  }

  checkSuper() {
    let url = this.baseUrl + "/auth/check/super/type";
    this.httpClient.get(url).subscribe(res => {
      if (!res) {
        this.goHome()
      }
    }, err => this.goHome())
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goBackToFirstModal() {
    $(document.getElementById('questModal')).modal('show');
    $(document.getElementById('wheelModal')).modal('hide');
  }

  turnWheel() {
    if (this.wheelAvailable) {
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
    this.httpClient.post(url, {}).subscribe(res => {
      this.wheelContentResponse = res
      this.currentPrize = this.wheelContentResponse.currentPrize ? this.wheelContentResponse.currentPrize : 0
      this.tokenBalance += this.currentPrize;
      this.nextAvailableTime = this.wheelContentResponse.nextTurningTimeCounter + new Date().getTime()
      let index = this.wheelContentResponse.currentIndex;
      let deg = 30 * index + 3600
      this.rotateWheel(-deg, "transform 5s ease-out")
      setTimeout(() => {
        this.wheelAvailable = this.wheelContentResponse.wheelTurningAvailable
        if (!this.wheelAvailable) {
          this.setTimerForWheel()
        }
      }, 5500)
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

  private getImageUrl() {
    let cookieName = this.getCookie("imageUrl")
    if (cookieName && cookieName.length > 0) {
      return cookieName;
    }

    let localStorageName = this.getItemFromLocalStorage("imageUrl")
    if (localStorageName && localStorageName.length > 0) {
      return localStorageName;
    }

    return ''
  }

  private getItemFromLocalStorage(fieldName: string) {
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
    let imageUrl: string = this.authResponse.imageUrl;
    if (imageUrl.endsWith("_normal.jpg")) {
      imageUrl = imageUrl.substring(0, imageUrl.length - 11) + ".jpg";
    }
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = `; path=${this.authCookiePath}`;
    this.document.cookie = `name=${this.authResponse.name}; ${expires}${cpath}`;
    this.document.cookie = `imageUrl=${imageUrl}; ${expires}${cpath}`;
    this.document.cookie = `token=${this.authResponse.token}; ${expires}${cpath}`;
    this.document.defaultView?.localStorage.setItem("token", this.authResponse.token)
    this.document.defaultView?.localStorage.setItem("name", this.authResponse.name)
    this.document.defaultView?.localStorage.setItem("imageUrl", imageUrl)
    let time = d.getTime()
    this.document.defaultView?.localStorage.setItem("expiresAt", time ? time.toString() : '0')
  }

  hasFooter() {
    let url = this.router.url;
    if (!url) {
      return false;
    }
    for (let noFooterPage of this.noFooterPages) {
      if (noFooterPage.startsWith && url.startsWith(noFooterPage.path)) {
        return false;
      }
       
      if(!noFooterPage.startsWith && url === noFooterPage.path) {
        return false;
      }
    }

    return true;
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
