import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = environment.apiUrl;
  private reservations = new BehaviorSubject<Reservation[]>([]);
  
  constructor(private http: HttpClient) {
    this.reservations.next([]);
  }


  //CRUD
  getReservations(): Observable<Reservation[]> {
    const url = `${this.apiUrl}/Bookings`;
    this.http.get<Reservation[]>(url).subscribe((reservations) => {
      this.reservations.next(reservations);
    });
    return this.reservations.asObservable();
  }

  getReservation(id:string): Reservation | undefined  {
    return this.reservations.value.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    const url = `${this.apiUrl}/Bookings/CreateBooking`;
    this.http.post<Reservation>(url, reservation)
    .subscribe((response) => {
      const currentReservations = this.reservations.value;
      this.reservations.next([...currentReservations, response]);
      console.log('Success!', response)
    },
    (error) => {
      console.error('Error', error);
    });
  }

  deleteReservation(id:string): void {
    const url = `${this.apiUrl}/Bookings/DeleteBooking/${id}`;
    this.http.delete<Reservation>(url)
    .subscribe(() => {
      const updatedReservations = this.reservations.value.filter(reservation => reservation.id !== id);
      this.reservations.next(updatedReservations);
      console.log('Booking has been deleted successfully')
    },
    (error) => {
      console.error('Error', error);
    });
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    const url = `${this.apiUrl}/Bookings/UpdateBooking/${id}`;
    this.http.put<Reservation>(url, updatedReservation)
    .subscribe((updatedReservation) => {
      
      console.log('Booking has been updated successfully', updatedReservation);
    },
    (error) => {
      console.log('Error updating booking:', error);
    });
  }
}
