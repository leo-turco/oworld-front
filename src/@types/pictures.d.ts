export interface Picture {
  url: string;
  author: string;
  description: string;
}

export interface PicturesProps {
  pictures: Picture[] | null;
}
