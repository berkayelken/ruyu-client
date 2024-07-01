import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { TweetEmbedComponent } from '../tweet-embed/tweet-embed.component'; 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-minnies',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterOutlet,
    RouterLink,
    TweetEmbedComponent // Import TweetEmbedComponent here
  ],
  templateUrl: './minnies.component.html',
  styleUrls: ['./minnies.component.css']
})
export class MinniesComponent implements OnInit {
  slidePicTemplate = "../../../assets/minnies/image";
  customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 3100,
    autoplaySpeed: 1500,
    lazyLoad: true,
    center: true,
    responsive: {
        0: {
            items: 2,
            loop:true
        },
        600: {
            items: 4,
            loop:true
        },
        1000: {
            items: 10,
            loop:true
        }
    }
  }

  tweetSliderOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 2500,
    lazyLoad: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      }
    }
  }

  activeSlides: SlidesOutputData = {};
  slidesStore: any[] = [];
  tweetEmbedCodes: string[] = [
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Great to welcome another diverse &amp; inclusive collection to the WoA family - with a kick ass Female Founder to boot! <br><br>A warm welcome to <a href="https://twitter.com/voxelqueen?ref_src=twsrc%5Etfw">@voxelqueen</a> and the <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a>! <br><br>Holders, jump into our server &amp; verify for access to the community &amp; giveaways 👉<a href="https://t.co/eSnlEUvtNm">https://t.co/eSnlEUvtNm</a> <a href="https://t.co/5sj32XYSk0">pic.twitter.com/5sj32XYSk0</a></p>&mdash; World of Alpha (@worldofalpha) <a href="https://twitter.com/worldofalpha/status/1735634996461756443?ref_src=twsrc%5Etfw">December 15, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ofc Minnies would be in <a href="https://twitter.com/oncyber?ref_src=twsrc%5Etfw">@oncyber</a> too! <br><br>Shout out to <a href="https://twitter.com/punk6529?ref_src=twsrc%5Etfw">@punk6529</a> <a href="https://t.co/GaB8tFUP9Q">pic.twitter.com/GaB8tFUP9Q</a></p>&mdash; VQ (@voxelqueen) <a href="https://twitter.com/voxelqueen/status/1733926080921088014?ref_src=twsrc%5Etfw">December 10, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Some <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> samples 🙈 <a href="https://t.co/ktSQ7cA6YW">pic.twitter.com/ktSQ7cA6YW</a></p>&mdash; VQ (@voxelqueen) <a href="https://twitter.com/voxelqueen/status/1740367185959162010?ref_src=twsrc%5Etfw">December 28, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Minnies back to being mini now! We will miss the giant days as well though 😂 <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a> <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> <a href="https://t.co/tQOsC3k5pa">pic.twitter.com/tQOsC3k5pa</a></p>&mdash; VQ (@voxelqueen) <a href="https://twitter.com/voxelqueen/status/1750574576889712902?ref_src=twsrc%5Etfw">January 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">gm gm all<br>Do you even <a href="https://twitter.com/hashtag/niftyisland?src=hash&amp;ref_src=twsrc%5Etfw">#niftyisland</a> bro ...?<a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> by <a href="https://twitter.com/voxelqueen?ref_src=twsrc%5Etfw">@voxelqueen</a> in action <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a> <a href="https://twitter.com/hashtag/nft?src=hash&amp;ref_src=twsrc%5Etfw">#nft</a> <a href="https://twitter.com/hashtag/web3?src=hash&amp;ref_src=twsrc%5Etfw">#web3</a> <a href="https://twitter.com/hashtag/gaming?src=hash&amp;ref_src=twsrc%5Etfw">#gaming</a> <a href="https://t.co/0QNeEexv2a">pic.twitter.com/0QNeEexv2a</a></p>&mdash; seizerpunk.eth (@seizerpunk) <a href="https://twitter.com/seizerpunk/status/1806284628908462116?ref_src=twsrc%5Etfw">June 27, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Shoutout to <a href="https://twitter.com/voxelqueen?ref_src=twsrc%5Etfw">@voxelqueen</a> and her cute <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> collection! Announcing now that every single Minnie will be playable in Nifty Island🏝️ <a href="https://t.co/tQCjoqw9Nv">pic.twitter.com/tQCjoqw9Nv</a></p>&mdash; Nifty Island 🏝 (@Nifty_Island) <a href="https://twitter.com/Nifty_Island/status/1732443967218671628?ref_src=twsrc%5Etfw">December 6, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
    `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Gm minnies! 🐇🌞🤎😀👑🐶🦋🌳⚡️💥🌈🐰 shout out to the <a href="https://twitter.com/voxelqueen?ref_src=twsrc%5Etfw">@voxelqueen</a> 🟨👑🏆 &amp; <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a> 🏝️ <a href="https://t.co/qAcRYZ2Fr6">pic.twitter.com/qAcRYZ2Fr6</a></p>&mdash; ghost (@NakaGang) <a href="https://twitter.com/NakaGang/status/1769388877347803549?ref_src=twsrc%5Etfw">March 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Check it out, <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> on Pudgy Island! <a href="https://t.co/ymDIt6gWhi">pic.twitter.com/ymDIt6gWhi</a></p>&mdash; b-frank 💣 (@B_Fr4nk) <a href="https://twitter.com/B_Fr4nk/status/1750604641878901102?ref_src=twsrc%5Etfw">January 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
   `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Minnies, (at the moment not so minnie) but so cool!<br><br>Ready to play in <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a> and compared to other avatar collections, Minnies are still available at a big discount.<br><br>But for how long? <br><br>Supply 999 (so avatars to play on the Islands)<br>For sale +/- 65 avatars<br><br>Lets meet and… <a href="https://t.co/GsRo2E2nt4">pic.twitter.com/GsRo2E2nt4</a></p>&mdash; BΞNJAMIN 𝐌𝐋𝐏𝐒 🇳🇱 (@Benjaminmlps) <a href="https://twitter.com/Benjaminmlps/status/1750148593166450935?ref_src=twsrc%5Etfw">January 24, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
  `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We are back from maintenance!<br><br>Stability fixes are in and over the next couple hours many new avatars will be made available to holders as they are processed!<br><br>staked <a href="https://twitter.com/SappySealsNFT?ref_src=twsrc%5Etfw">@SappySealsNFT</a> <a href="https://twitter.com/pudgypenguins?ref_src=twsrc%5Etfw">@pudgypenguins</a> <a href="https://twitter.com/forgottenrunes?ref_src=twsrc%5Etfw">@forgottenrunes</a> Souls<a href="https://twitter.com/y00tsNFT?ref_src=twsrc%5Etfw">@y00tsNFT</a> <a href="https://twitter.com/cryptopunksnfts?ref_src=twsrc%5Etfw">@cryptopunksnfts</a> <a href="https://twitter.com/Nakamigos?ref_src=twsrc%5Etfw">@Nakamigos</a> <br>@FroggyFriendNFT… <a href="https://t.co/6jKDgNVVCy">pic.twitter.com/6jKDgNVVCy</a></p>&mdash; Nifty Island 🏝 (@Nifty_Island) <a href="https://twitter.com/Nifty_Island/status/1749912341196513593?ref_src=twsrc%5Etfw">January 23, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">How adorable are <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> in <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a>?<br><br>😊❤️ <a href="https://t.co/hPc3gxvaWm">pic.twitter.com/hPc3gxvaWm</a></p>&mdash; Joey | Paranormal One🍁 🇨🇦🎅 (@paranormal__one) <a href="https://twitter.com/paranormal__one/status/1748759875037851922?ref_src=twsrc%5Etfw">January 20, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Catch me on <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a> as Wise<br><br>Rocking my <a href="https://twitter.com/voxelqueen?ref_src=twsrc%5Etfw">@voxelqueen</a> Minnies <a href="https://t.co/MujMgwR0wn">pic.twitter.com/MujMgwR0wn</a></p>&mdash; wisemetajay (@wisemetajay) <a href="https://twitter.com/wisemetajay/status/1748379653696315757?ref_src=twsrc%5Etfw">January 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">𝗠𝗶𝗻𝗻𝗶𝗲𝘀 𝗯𝘆 <a href="https://twitter.com/voxelqueen?ref_src=twsrc%5Etfw">@voxelqueen</a><br><br>🧵⬇️ <a href="https://t.co/KXkhhS3KDh">pic.twitter.com/KXkhhS3KDh</a></p>&mdash; Doug Dimmadome (@DimmadomeCrypto) <a href="https://twitter.com/DimmadomeCrypto/status/1738159739975143434?ref_src=twsrc%5Etfw">December 22, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ready to kick it on <a href="https://twitter.com/Nifty_Island?ref_src=twsrc%5Etfw">@Nifty_Island</a> with my <a href="https://twitter.com/MinniesbyVQ?ref_src=twsrc%5Etfw">@MinniesbyVQ</a> <a href="https://t.co/mwkAsFYyq9">pic.twitter.com/mwkAsFYyq9</a></p>&mdash; RegularRuben 🇲🇽 (@RegularRuben) <a href="https://twitter.com/RegularRuben/status/1740875025752965620?ref_src=twsrc%5Etfw">December 29, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
];

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < 22; i++) {
      let image = this.slidePicTemplate + i + ".webp";
      this.slidesStore.push({id: i, src: image})
    }
  }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

}

