import { Routes } from '@angular/router';

import { FarmComponent } from './farm/farm.component';
import { HomeComponent } from './home/home.component';
import { MinniesComponent } from './minnies/minnies.component';
import { NftcollectionComponent } from './nftcollection/nftcollection.component';
import { StudioComponent } from './studio/studio.component';
import { TeamComponent } from './team/team.component';
import { TheloreComponent } from './thelore/thelore.component';
import { AdminQuestPanelComponent } from './admin-quest-panel/admin-quest-panel.component';
import { AdminQuestComponent } from './admin-quest/admin-quest.component';
import { AdminWheelPanelComponent } from './admin-wheel-panel/admin-wheel-panel.component';
import { AdminWheelComponent } from './admin-wheel/admin-wheel.component';
import { AdminSearchTweetPanelComponent } from './admin-search-tweet-panel/admin-search-tweet-panel.component';
import { AdminApproveTweetComponent } from './admin-approve-tweet/admin-approve-tweet.component';
import { PortfolioComponent } from './portfolio/portfolio.component';


export const routes: Routes = [{ path: '', component: HomeComponent },
//{ path: 'farm', component: FarmComponent, data: { title: 'FARM $ROW' } },
{ path: 'minnies', component: MinniesComponent , data: { title: 'MINNIES' }},
{ path: 'nftcollection', component: NftcollectionComponent , data: { title: 'RUYUI NFT' }},
{ path: 'studio', component: StudioComponent ,data: { title: 'STUDIO' }},
{ path: 'team', component: TeamComponent, data: { title: 'TEAM' }},
{ path: 'thelore', component: TheloreComponent ,data: { title: 'THE LORE' }},
{ path: 'portfolio', component: PortfolioComponent , data: { title: 'PORTFOLIO' }},

{ path: 'admin/quests', component: AdminQuestPanelComponent },
{ path: 'admin/quest', component: AdminQuestComponent },
{ path: 'admin/wheels', component: AdminWheelPanelComponent },
{ path: 'admin/wheel', component: AdminWheelComponent },
{ path: 'admin/search/tweet', component: AdminSearchTweetPanelComponent },
{ path: 'admin/approve/tweet', component: AdminApproveTweetComponent },
{ path: '**', component: HomeComponent }

];
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
