import { Component, input } from '@angular/core';
import { SpotData } from '../../models/spots';


@Component({
  selector: 'app-spot',
  imports: [],
  templateUrl: './spot.html',
  styleUrl: './spot.css',
})
export class Spot {
  spotData = input.required<SpotData>(); 
}
