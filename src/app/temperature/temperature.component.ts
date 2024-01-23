import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent  implements  AfterViewInit {
  @ViewChild('temperatureChartCanvas', { static: false }) chartCanvas!: ElementRef;

  dataPoints1: number[] = [];
  dataPoints2: number[] = [];
  updateInterval = 2000;

  constructor() {}

  ngAfterViewInit() {
    this.createTemperatureGraph();
    this.startDataUpdates();
  }

  createTemperatureGraph() {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const chartWidth = canvas.width;
    const chartHeight = canvas.height;

    // Draw x-axis gridlines
    const xGridCount = 6;
    for (let i = 1; i < xGridCount; i++) {
      const x = (i / xGridCount) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, chartHeight);
      ctx.strokeStyle = '#ccc'; // Gridline color
      ctx.stroke();
    }

    // Draw y-axis gridlines
    const yGridCount = 5;
    for (let i = 1; i < yGridCount; i++) {
      const y = (i / yGridCount) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.strokeStyle = '#ccc'; // Gridline color
      ctx.stroke();
    }

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, chartHeight);
    ctx.lineTo(chartWidth, chartHeight);
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, chartHeight);
    ctx.stroke();

    // Draw temperature lines
    this.drawTemperatureLine(ctx, this.dataPoints1, 'blue');
    this.drawTemperatureLine(ctx, this.dataPoints2, 'red');
  }

  drawTemperatureLine(ctx: CanvasRenderingContext2D, dataPoints: number[], color: string) {
    const canvas = this.chartCanvas.nativeElement;
    const chartWidth = canvas.width;
    const chartHeight = canvas.height;

    const yAxisValues = [0, 20, 40, 60, 80, 100]; // Temperature values on y-axis
    const xAxisValues = ['', 5, 10, '', 20, 25, 30]; // Time labels on x-axis

    ctx.beginPath();

    for (let i = 0; i < dataPoints.length; i++) {
      const x = (i / (dataPoints.length - 1)) * chartWidth;
      const y = (chartHeight / 100) * (100 - dataPoints[i]); // Scale y-axis to match the temperature range
      ctx.lineTo(x, y);
    }

    // Draw the line
    ctx.strokeStyle = color;
    ctx.stroke();

    // Draw temperature values on the y-axis
    ctx.fillStyle = color;
    for (let i = 0; i < yAxisValues.length; i++) {
      const y = (chartHeight / 100) * (100 - yAxisValues[i]);
      ctx.fillText(yAxisValues[i].toString(), 5, y + 5); // Adjusted position
    }

    // Draw time labels on the x-axis
    for (let i = 0; i < xAxisValues.length; i++) {
      const x = (i / (xAxisValues.length - 1)) * chartWidth;
      ctx.fillText(xAxisValues[i].toString(), x, chartHeight - 5);
    }

    // Add labels
    ctx.fillStyle = 'black';
    ctx.fillText('Temperature (°C)', 5, chartHeight / 2);
    ctx.fillText('Time (min)', chartWidth / 2, chartHeight - 5);
  }

  startDataUpdates() {
    setInterval(() => {
      this.updateData();
      this.updateChart();
    }, this.updateInterval);
  }

  updateData() {
    // Simulate new data points
    const newDataPoint1 = Math.floor(Math.random() * (100 - 70 + 1) + 70);
    const newDataPoint2 = Math.floor(Math.random() * (100 - 70 + 1) + 70);

    this.dataPoints1.push(newDataPoint1);
    this.dataPoints2.push(newDataPoint2);

    // Keep a fixed number of data points for better performance
    const maxDataPoints = 20;
    if (this.dataPoints1.length > maxDataPoints) {
      this.dataPoints1.shift();
    }
    if (this.dataPoints2.length > maxDataPoints) {
      this.dataPoints2.shift();
    }
  }

  updateChart() {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw x-axis gridlines
    const xGridCount = 6;
    for (let i = 1; i < xGridCount; i++) {
      const x = (i / xGridCount) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.strokeStyle = '#ccc'; // Gridline color
      ctx.stroke();
    }

    // Draw y-axis gridlines
    const yGridCount = 5;
    for (let i = 1; i < yGridCount; i++) {
      const y = (i / yGridCount) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.strokeStyle = '#ccc'; // Gridline color
      ctx.stroke();
    }

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    // Draw updated temperature lines
    this.drawTemperatureLine(ctx, this.dataPoints1, 'blue');
    this.drawTemperatureLine(ctx, this.dataPoints2, 'red');
  }
}