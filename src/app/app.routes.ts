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


export const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'farm', component: FarmComponent },
{ path: 'minnies', component: MinniesComponent },
{ path: 'nftcollection', component: NftcollectionComponent },
{ path: 'studio', component: StudioComponent },
{ path: 'team', component: TeamComponent },
{ path: 'thelore', component: TheloreComponent },
{ path: 'admin/quests', component: AdminQuestPanelComponent },
{ path: 'admin/quest', component: AdminQuestComponent },
{ path: 'admin/wheels', component: AdminWheelPanelComponent },
{ path: 'admin/wheel', component: AdminWheelComponent },
{ path: 'admin/search/tweet', component: AdminSearchTweetPanelComponent },
{ path: 'admin/approve/tweet', component: AdminApproveTweetComponent },
{ path: '**', component: HomeComponent }
];
