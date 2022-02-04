import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sauce } from '../models/Sauce.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SaucesService {

  sauces$ = new Subject<Sauce[]>();


  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getSauces() {
    this.http.get('http://localhost:3000/api/sauces', { withCredentials: true }).subscribe(
      (sauces: Sauce[]) => {
        this.sauces$.next(sauces);
      },
      (error) => {
        this.sauces$.next([]);
        console.error(error);
      }
    );
  }

  getSauceById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/sauces/' + id, { withCredentials: true }).subscribe(
        (sauce: Sauce) => {
          resolve(sauce);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  likeSauce(id: string, like: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/sauces/' + id + '/like',
        {
          userId: this.auth.getUserId(),
          like: like ? 1 : 0
        }, { withCredentials: true })
        .subscribe(
          (response: { message: string }) => {
            resolve(like);
          },
          (error) => {
            reject(error);
        }
      );
    });
  }

  dislikeSauce(id: string, dislike: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/sauces/' + id + '/like',
        {
          userId: this.auth.getUserId(),
          like: dislike ? -1 : 0
        }, { withCredentials: true })
        .subscribe(
          (response: { message: string }) => {
            resolve(dislike);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createSauce(sauce: Sauce, image: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('sauce', JSON.stringify(sauce));
      formData.append('image', image);
      this.http.post('http://localhost:3000/api/sauces', formData, { withCredentials: true }).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifySauce(id: string, sauce: Sauce, image: string | File) {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
        this.http.put('http://localhost:3000/api/sauces/' + id, sauce, { withCredentials: true }).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('sauce', JSON.stringify(sauce));
        formData.append('image', image);
        this.http.put('http://localhost:3000/api/sauces/' + id, formData, { withCredentials: true }).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deleteSauce(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/sauces/' + id, { withCredentials: true }).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
