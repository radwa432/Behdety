export interface BlogPost {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    authorId: number;
    authorName: string;
    blogCategoryId: number;
    blogCategoryName: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }

  export interface Author {
    id: number;
    name: string;
    bio?: string;
    imageUrl?: string;
  }