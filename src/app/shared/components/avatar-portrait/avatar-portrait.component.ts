import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-portrait',
  templateUrl: './avatar-portrait.component.html',
  styleUrls: ['./avatar-portrait.component.scss']
})
export class AvatarPortraitComponent implements OnInit {

  @Input() imagePath = ''; // TODO: confirm that initializing an empty string works

  constructor() { }

  ngOnInit() {
  }

}
