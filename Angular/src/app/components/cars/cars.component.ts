import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CarServiceService } from '../../services/car-service.service';
import { CarModule } from 'src/app/module/car.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from '../../services/snack-bar.service';
import { CarComponent } from '../car/car.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  displayedColumns: string[] = ['id_car', 'model', 'hp', 'marque', 'action'];
  dataSource!: MatTableDataSource<CarModule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cars!: CarModule[];

  constructor(
    private myservice: CarServiceService, 
    private _UpdateCar: MatDialog,
    private _snackBarService:SnackBarService,
    ){}
  
  ngOnInit():void{
    this.getCars();
  }

  getCars(){
    this.myservice.getAllcars().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<CarModule>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  delete(id_car:number){
    this.myservice.deleteCar(id_car).subscribe({
      next: (res)=>{
        this._snackBarService.openSnackBar("Car deleteted successfully");
        this.getCars();
      },
      error: console.log,
    });
  }

  update(data:any){
      this._UpdateCar.open(CarComponent, { data });
  }

}
