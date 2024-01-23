import { Component } from '@angular/core';

export interface VaseItem {
  name: string;
  imageUrl: string;
  description: string;
}

export interface CoasterItem {
  name: string;
  imageUrl: string;
  description: string;
}



@Component({
  selector: 'app-model-gallery',
  templateUrl: './model-gallery.component.html',
  styleUrls: ['./model-gallery.component.css']
})
export class ModelGalleryComponent {
  vaseItems: VaseItem[] = [
    {
      name: 'Bottle neck',
      imageUrl: 'assets/images/vase/vase-1.png',
      description: 'This is a model of Bottle neck vase. this vase is ...',
    },
    {
      name: 'Geomatrical',
      imageUrl: 'assets/images/vase/vase-2.png',
      description: 'This is a model of Geomatrical vase. this vase is ...',
    },
    {
      name: 'Decor vase',
      imageUrl: 'assets/images/vase/vase-6.png',
      description: 'This is a model of Decor vase. this vase is ...',
    },
    {
      name: 'Helix vase',
      imageUrl: 'assets/images/vase/vase-7.png',
      description: 'This is a model of Helix type vase. this vase is ...',
    }
    // ... (add other VaseItems)
  ];

  coasterItems: CoasterItem[] = [
    {
      name: 'Tree wood',
      imageUrl: 'assets/images/coaster/coaster-1.png',
      description: 'This is a model of Tree wood coaster. this vase is ...',
    },
    {
      name: 'Design',
      imageUrl: 'assets/images/coaster/coaster-2.png',
      description: 'This is a model of Design coaster. this vase is ...',
    },
    {
      name: 'Colorful',
      imageUrl: 'assets/images/coaster/coaster-3.png',
      description: 'This is a model of Colorful coaster. this vase is ...',
    },
    {
      name: 'Funky',
      imageUrl: 'assets/images/coaster/coaster-5.png',
      description: 'This is a model of Funky coaster. this vase is ...',
    },
    {
      name: 'Square',
      imageUrl: 'assets/images/coaster/coaster-6.png',
      description: 'This is a model of Square coaster. this vase is ...',
    },
    {
      name: 'Shapes',
      imageUrl: 'assets/images/coaster/coaster-7.png',
      description: 'This is a model of Shapes coaster. this vase is ...',
    },
  ];

  searchQuery: string = ''; // Initialize with an empty string
  selectedCategory: 'vases' | 'coasters' | 'all' = 'all'; // Default to 'all'

  get filteredVaseItems(): VaseItem[] {
    const lowerCaseSearchQuery = this.searchQuery.toLowerCase();

    return (this.selectedCategory === 'vases' || this.selectedCategory === 'all') ?
      this.vaseItems.filter(item => item.name.toLowerCase().includes(lowerCaseSearchQuery)) : [];
  }

  get filteredCoasterItems(): CoasterItem[] {
    const lowerCaseSearchQuery = this.searchQuery.toLowerCase();

    return (this.selectedCategory === 'coasters' || this.selectedCategory === 'all') ?
      this.coasterItems.filter(item => item.name.toLowerCase().includes(lowerCaseSearchQuery)) : [];
  }

  public isCategoryEmpty(category: 'vases' | 'coasters' | 'all'): boolean {
    return (category === 'vases' || category === 'all') ? !this.filteredVaseItems.length :
      (category === 'coasters' || category === 'all') ? !this.filteredCoasterItems.length :
      true;
  }
}
