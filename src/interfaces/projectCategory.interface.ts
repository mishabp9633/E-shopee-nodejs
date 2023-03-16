import { Document } from "mongoose";

export interface ProjectCategory extends Document{
  title: string;
  description: string;
  images: Array<Image>;
}

export interface Image {
  public_id: string;
  url: string;
}