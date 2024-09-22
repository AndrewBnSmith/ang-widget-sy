import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Friend {
  id: number;
  name: string;
  isMe?: boolean;
}

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent {
  friends: Friend[] = [
    { id: 0, name: 'Me', isMe: true },
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  dropdownIndex: number | null = null;

  addFriend() {
    const newFriend: Friend = {
      id: this.friends.length,
      name: `Friend ${this.friends.length}`
    };
    this.friends.push(newFriend);
  }

  toggleDropdown(index: number) {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  viewProfile(friend: Friend) {
    console.log(`Viewing profile of ${friend.name}`);
  }

  chatWithFriend(friend: Friend) {
    console.log(`Chatting with ${friend.name}`);
  }

  friendSettings(friend: Friend) {
    console.log(`Settings for ${friend.name}`);
  }

  deleteFriend(index: number) {
    this.friends.splice(index, 1);
    this.dropdownIndex = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.friend-item')) {
      this.dropdownIndex = null;
    }
  }
}