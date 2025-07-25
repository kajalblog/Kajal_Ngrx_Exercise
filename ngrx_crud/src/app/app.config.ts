import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStore} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools'

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TaskEffect } from '../store/effects/task-effect.effect';
import { Tasks } from '../model/task';
import { TaskReducer } from '../store/reducer/task.reducer';
import { UserEffect } from '../store/effects/users/users.effect';
import { UserReducer } from '../store/reducer/user.reducer';
import { ProjectReducer } from '../store/reducer/project.reducer';
import { ProjectEffect } from '../store/effects/project.effect';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    provideStore({
      tasks:TaskReducer,
      users:UserReducer,
      projects:ProjectReducer
    }
    ),
    provideEffects(TaskEffect,UserEffect,ProjectEffect),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    })
    

  ]
};
