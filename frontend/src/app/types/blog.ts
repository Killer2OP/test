export interface Specification {
  title: string;
  value: string;
}

export interface Blog {
  slug: string;
  name: string;
  bgImage: string;
  description: string;
  image: string;
  overview: string;
  specifications: Specification[];
  images: string[];
  totalUsers: number;
  publishDate?: string;
  advantages?: { title: string; description: string }[];
  advantagesImg?: string;
  application?: { title: string; description: string }[];
}
