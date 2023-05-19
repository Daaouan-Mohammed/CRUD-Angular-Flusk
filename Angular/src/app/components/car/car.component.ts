import { Component, Inject } from '@angular/core';
import { CarServiceService } from '../../services/car-service.service';
import { CarModule } from '../../module/car.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  // two way binding
  model!: string;
  hp!: number;
  marque!: string;

  AddCarForm: FormGroup;
  errorMsg: any;

  constructor(
    private carservice: CarServiceService,
    private _dialogRef: MatDialogRef<CarComponent>,
    private _fb: FormBuilder,
    private _snackBarService: SnackBarService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    //that could be in ngOnInit()
    this.AddCarForm = this._fb.group({
      model: this._fb.control(""),
      hp: this._fb.control(""),
      marque: this._fb.control(""),
    })
    //update
    this.AddCarForm.patchValue(this.data);
  }

  //event bindding
  saveMe() {
    console.log("click!!!!1");
    let mycar = new CarModule();
    mycar.id_car = 0;
    mycar.hp = this.hp;
    mycar.model = this.model;
    mycar.marque = this.marque;
    console.log(mycar);
    this.carservice.saveCare(mycar).subscribe();
    this._dialogRef.close();
    this._snackBarService.openSnackBar("Car created successfully");
  }

   

}
