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

// Post
export interface Post {
  id: number;
  user_id: number;
  group_id: number;
  content: string;
  image: string[];
  reactions: Reaction[];
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
  post_id: number;
  user_id: number;
  image: string;
  content: string;
  reactions: Reaction[];
  created_at: string;
}

// Group
export interface Group {
  id: number;
  groupName: string;
  group_picture: string;
  banner: string;
  bio: string;
  members: Member[];
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
