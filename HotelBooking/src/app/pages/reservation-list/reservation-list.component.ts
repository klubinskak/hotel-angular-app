import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService){};

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(
      (reservations) => {
      this.reservations = reservations;
      console.log("Reservations:", reservations);
    },
    (error: any) => {
      console.error('Error fetching reservation:', error);
    }
    );
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id);
  }
}
