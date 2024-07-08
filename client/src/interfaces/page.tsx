/**
 * Interface Page
 */

// User
export interface User {
  id: number;
  userName: string;
  email: string;
  name: string;
  password: string;
  avatar: string;
  banner: string;
  bio: string;
  follows: Follow[];
  friends: Friend[];
  groups: Group[];
  created_at: string;
  status: true;
}

export interface Follow {
  userId: number;
  created_at: string;
}

export interface Friend {
  userId: number;
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
