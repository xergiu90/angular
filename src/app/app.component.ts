import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface DateResponse {
    id: number;
    start: Date;
    end: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    nowDate: Date;
    startDateVariable: Date;
    endDateVariable: Date;
    inBetweenVariable: Date;
    isInBetween: boolean;
    checkDateVariable: boolean;
    dateJsonStart: Date;
    dateJsonEnd: Date;

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.http.get<DateResponse>
        ('http://localhost:3000/date').subscribe(data => {
            var dates= data[0];
            this.dateJsonStart=dates.start;
            this.dateJsonEnd=dates.end;
        });
    }

    startDate(value: Date): void {
        this.startDateVariable= value;
    }

    endDate(value: Date): void {
        this.endDateVariable= value;
    }

    inBetween(value: Date): void {
        this.inBetweenVariable= value;
    }


    onValueChange(value: Date): void {
        this.nowDate = new Date(Date.now());
    }

    checkDate(event): void {
        this.checkDateVariable= true;
        if(this.startDateVariable < this.inBetweenVariable && this.inBetweenVariable < this.endDateVariable) {
            this.isInBetween=true;
        } else {
            this.isInBetween=false;
        }
    }

    saveDate(event): void {
        if(this.isInBetween) {
        this.http.post('http://localhost:3000/dates', {
            id: 1,
            start: this.startDateVariable,
            end: this.endDateVariable
        })
            .subscribe(
                res => {
                    console.log(res);
                },
                err => {
                    console.log("Error occured");
                }
            );
        }
    }
}
