import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AllbooksComponent } from './allbooks/allbooks.component';
import { PageNotFoundComponent } from './page-not-found/not-found.component';
import { AllinterestsComponent } from './allinterests/allinterests.component';

const routes: Routes = [

                        {path:'myInterest',
                        loadChildren: 'app/my-interest/my-interest.module#MyInterestModule'
                        // canLoad:[AuthGuard]
                        },
                        {path: 'allInterests', component: AllinterestsComponent},
                        { path: '**', component: PageNotFoundComponent }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  PageNotFoundComponent,
                                  AllinterestsComponent
                               ];
