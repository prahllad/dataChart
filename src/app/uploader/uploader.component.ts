import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  '../services/upload.service';
import * as Highcharts from 'highcharts';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  form: FormGroup;
  error: string;
  userId: number = 1;
  categories:any = [];
  series:any = [];
  uploadResponse = { status: '', message: '', filePath: '' };
  loader:boolean = true;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }
  file:any;
  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    this.loader = false;
    const formData = new FormData();
    // formData.append('file', this.form.get('avatar').value,this.form.get('avatar').value.name);
    formData.append('data',this.file);
    // console.log(formData.get('data'));
    this.uploadService.upload(formData, this.userId).subscribe(
      (res) => {
        console.log(res);
        if(res.processed){
          this.categories = res.data.map(el=>el.date);
          let obj = {};
          obj['name'] = 'Temperature';
          obj['data'] = res.data.map(el=>el.temp);
          this.series.push(obj);
          this.loader = true;
          this.initGraph();
          
        }
        else{
        this.uploadResponse = res;

        }
       
      },
      (err) => this.error = err
    );
  }
  initGraph(){
    let options: any = {
      chart: {
        type: 'spline',
        height: 700
      },
      title: {
        text: 'Temparature graph'
      },
      credits: {
        enabled: false
      },
      // tooltip: {
      //   formatter: function() {
      //     return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + ' y: ' + this.y.toFixed(2);
      //   }
      // },
      xAxis: {
  
        categories: this.categories
      },
      series: this.series
    }
    Highcharts.chart('container', options);
  }
  
}
