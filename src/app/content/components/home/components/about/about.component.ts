import { Component, OnInit } from '@angular/core';
import { PublicImagePaths } from 'shared-models/routes-and-paths/image-paths.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  gregAvatarUrl = PublicImagePaths.AVATAR_GREG;
  mdAvatarUrl = PublicImagePaths.AVATAR_MD;

  constructor() { }

  ngOnInit(): void {
  }

}
