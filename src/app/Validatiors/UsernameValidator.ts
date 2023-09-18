import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsernameValidator {
    constructor(private http: HttpClient) {}
  
    validateUsernameAvailability(): AsyncValidatorFn {
      return (control: AbstractControl):
        | Observable<null | { [key: string]: any }>
        | Promise<null | { [key: string]: any }> => {
        return of(control.value).pipe(
          debounceTime(300),
          switchMap((username) => {
            return this.http
              .get<boolean>(`http://localhost:8000/api/checkUsername/${username}`)
              .pipe(
                map((available) => (available ? null : { usernameTaken: true })),
                catchError(async () => null)
              );
          })
        );
      };
    }
  }
  
