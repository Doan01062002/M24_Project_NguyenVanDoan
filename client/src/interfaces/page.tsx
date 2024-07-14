/**
 * Interface Page
 */

// User
export interface User {
  id: number;
  userName: string;
  email: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  password: string;
  city: string;
  work: string;
  study: string;
  hometown: string;
  relationship: string;
  follows: any[];
  friends: any[];
  groups: any[];
  created_at: string;
  status: boolean;
}

export interface Follow {
  userId: number;
  created_at: string;
}

export interface Friend {
  userId: number;
  nameFriend: string;
  imageFriend: string;
  add_at: string;
}

//
export interface FriendRequest {
  id: number;
  from_user_id: number;
  to_user_id: number;
  status: string;
  created_at: string;
}

// Post
export interface Post {
  id: number;
  user_id: number;
  group_id: number;
  content: string;
  image: string[];
  reaction: Reaction[];
  comments: Comment[];
  created_at: string;
  status: true;
  action: string;
}

export interface Reaction {
  user_id: number;
  type: string;
  created_at: string;
}

// Comment
export interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  avatar: string;
  image: string;
  content: string;
  reactions: Reaction[];
  reply_comment: replyComment[];
  created_at: string;
}

// Reply comment
export interface replyComment {
  user_id: number;
  user_name: string;
  avatar: string;
  image: string;
  content: string;
  reactions: Reaction[];
  create_at: string;
}

// Group
export interface Group {
  id: number;
  groupName: string;
  group_picture: string;
  banner: string;
  bio: string;
  members: Member[];
  status: true;
  created_at: string;
}

export interface Member {
  userId: number;
  join_at: string;
}

// Root
export interface Root {
  users: User[];
  posts: Post[];
  comments: Comment[];
  groups: Group[];
}

//Upload State

export interface UploadState {
  images: File[];
  name: string;
  previews: string[];
  selectedValue: string;
  showUploadFile: boolean;
}

// Search

export interface SearchResults {
  users: User[];
  posts: Post[];
  groups: Group[];
}

// Acount admin

export interface AccountAdmin {
  accountName: string;
  accountPassword: string;
}
