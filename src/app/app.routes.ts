import { Routes } from '@angular/router';

import { FarmComponent } from './farm/farm.component';
import { HomeComponent } from './home/home.component';
import { MinniesComponent } from './minnies/minnies.component';
import { NftcollectionComponent } from './nftcollection/nftcollection.component';
import { StudioComponent } from './studio/studio.component';
import { TeamComponent } from './team/team.component';
import { TheloreComponent } from './thelore/thelore.component';


export const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'farm', component: FarmComponent },
{ path: 'minnies', component: MinniesComponent },
{ path: 'nftcollection', component: NftcollectionComponent },
{ path: 'studio', component: StudioComponent },
{ path: 'team', component: TeamComponent },
{ path: 'thelore', component: TheloreComponent },
{ path: '**', component: HomeComponent }
];
