import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/component';
import { environment } from '../../environments/environment';
import { PagesComponent } from '../pages/component';
import { TagsComponent } from '../tags/component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'pages', component: PagesComponent },
    { path: 'pages/:pageId', component: PagesComponent },
    { path: 'pages/tag/:tagId', component: PagesComponent },
    { path: 'tags', component: TagsComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: environment.isDev },
        ),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }