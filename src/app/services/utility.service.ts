import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  generateEmployeeId(): string {
    const randomPart = Math.floor(Math.random() * 10000);
    const formattedRandomPart = randomPart.toString().padStart(4, '0');
    const randomNumber = '0101' + formattedRandomPart;
    return randomNumber;
  }
}
