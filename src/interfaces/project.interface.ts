import { Document } from "mongoose";

export interface Project extends Document{
  organization: string;
  client: string;
  title: string;
  description: string;
  category: string;
  segments: Array<Segment>;
  status: string;
  finance: Finance;
  history: History;
  requirements: Array<Requirement>;
  credentials: Array<Credential>;
  note: string;
}

export interface Segment extends Document{
  projectSegment: string;
  option: string;
  team: string;
}


export interface Finance extends Document{
  quatationAmount: number
  invoiceAmount: number
  aditionalAmount: number
  discount: number
  finalAmount: number
}


export interface History extends Document{
  proposedStartDate: Date
  actualStartDate: Date
  proposedEndDate: Date
  actualEndDate: Date
  deployedDate: Date
  finalDeliverydate: Date
}


export interface Requirement extends Document{
  date: Date
  title: string
  description: string
  remarks: string
  status: string
}


export interface Credential extends Document{
  title: string;
  details: string;
}