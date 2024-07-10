import { Component, OnInit } from '@angular/core';

interface Video {
  url: string;
}
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: Video[]  = [
    { url: "https://www.youtube.com/embed/5kcdRBHM7kM" },
    { url: "https://www.youtube.com/embed/gmA6MrX81z4" },
    { url: "https://www.youtube.com/embed/ofH5ptn5w-A" },
    { url: "https://www.youtube.com/embed/hvoD7ehZPcM" }
  ];
  displayedVideos: Video[] = [];
  currentIndex = 0;

  ngOnInit() {
    this.updateDisplayedVideos();
  }

  updateDisplayedVideos() {
    this.displayedVideos = [
      this.videos[this.currentIndex],
      this.videos[(this.currentIndex + 1) % this.videos.length],
      this.videos[(this.currentIndex + 2) % this.videos.length]
    ];
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
    this.updateDisplayedVideos();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.updateDisplayedVideos();
  }
  selectVideo(index: number) {
    this.currentIndex = index;
    this.updateDisplayedVideos();
  }
}