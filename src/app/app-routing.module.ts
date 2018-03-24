import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AllbooksComponent } from './allbooks/allbooks.component';
import { PageNotFoundComponent } from './page-not-found/not-found.component';

const routes: Routes = [

                        {path:'myInterest',
                        loadChildren: 'app/my-interest/my-interest.module#MyInterestModule'
                        // canLoad:[AuthGuard]
                        },
                        { path: '**', component: PageNotFoundComponent }
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  PageNotFoundComponent
                               ];
