import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
declare let WebMidi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None, // Disable view encapsulation
})
export class AppComponent implements OnInit {
  title = 'midiviz';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    WebMidi.enable((err: any) => {
      if (WebMidi.inputs.length < 1) {
        document.body.innerHTML += 'No device detected.';
      } else {
        WebMidi.inputs.forEach((device: any, index: any) => {
          document.body.innerHTML += `${index}: ${device.name} <br>`;
        });
      }

      const mySynth = WebMidi.inputs[0];

      mySynth.channels[1].addListener('noteon', (e: any) => {
        this.playNote();
      });
      mySynth.channels[2].addListener('noteon', (e: any) => {
        this.playNote2();
      });
    });
  }

  addDivToDOM(type: number): void {
    const divElement = document.createElement('div');
    divElement.style.position = 'absolute';
    divElement.style.left = Math.random() * window.innerWidth + 'px';
    divElement.style.top = Math.random() * window.innerHeight + 'px';
    divElement.style.width = '200px';
    divElement.style.height = '200px';
    divElement.style.backgroundColor = this.getRandomColor(); // Call getRandomColor function to get a random background color
    if (type === 1) divElement.classList.add('scale-out-center');
    if (type === 2) divElement.classList.add('puff-out-center');

    document.body.appendChild(divElement);
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  playNote() {
    this.addDivToDOM(1);
  }

  playNote2() {
    this.addDivToDOM(2);
  }
}
