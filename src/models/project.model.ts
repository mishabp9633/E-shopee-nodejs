import { model, Schema, Document } from 'mongoose';
import { Project } from '@interfaces/project.interface';
import mongoose from 'mongoose';

export enum PROJECT_STATUS {
  NEW = 'new',
  CHECKED = 'checked',
  PENDING = 'pending',
  CLOSED = 'closed',
  CONFIRMED = 'confirmed',
}

export enum REQUIREMENT_STATUS {
  NEW = 'new',
  CHECKED = 'checked',
  PENDING = 'pending',
  CLOSED = 'closed',
  CONFIRMED = 'confirmed',
}

export const projectSchema: Schema = new Schema(
  {
    organization: {
      type: String,
      ref: 'Organization',
    },
    client: {
      type: String,
      ref: 'Client',
    },
    title:{
      type: String,
      required:true
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      ref: 'ProjectCategory'
    },
    segments: [
      {
        projectSegment: {
          type: String,
          ref:"ProjectSegment"
        },
        option: {
          type: String,
        },
        team: {
          type: String,
          ref:"Team"
        },
      }
    ],
    status: {
      type: String,
      required: [true, 'Please select status type'],
      enum: {
        values: [
          PROJECT_STATUS.NEW, 
          PROJECT_STATUS.CHECKED, 
          PROJECT_STATUS.PENDING, 
          PROJECT_STATUS.CLOSED, 
          PROJECT_STATUS.CONFIRMED
        ],
        message: 'Please select correct project status type',
      },
      default: PROJECT_STATUS.NEW,
    },

    finance: {
      quatationAmount: {
        type: Number,
        default: 0
      },
      invoiceAmount: {
        type: Number,
        default: 0
      },
      aditionalAmount: {
        type: Number,
        default: 0
      },
      discount: {
        type: Number,
        default: 0
      },
      finalAmount: {
        type: Number,
        default: 0
      },
    },
    history: {
      proposedStartDate: {
        type: Date,
      },
      actualStartDate: {
        type: Date,
      },
      proposedEndDate: {
        type: Date,
      },
      actualEndDate: {
        type: Date,
      },
      deployedDate: {
        type: Date,
      },
      finalDeliverydate: {
        type: Date,
      },
    },
    requirements: [
      {
        date: {
          type: Date,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        remarks: {
          type: String,
        },
        status: {
          type: String,
          enum: {
            values: [
              REQUIREMENT_STATUS.NEW, 
              REQUIREMENT_STATUS.CHECKED, 
              REQUIREMENT_STATUS.PENDING, 
              REQUIREMENT_STATUS.CLOSED, 
              REQUIREMENT_STATUS.CONFIRMED],
            message: 'Please select correct requirement status type',
          },
          default: REQUIREMENT_STATUS.NEW,
        },
      },
    ],
    credentials: [
      {
        title: {
          type: String,
        },
        details: {
          type: String,
        },
      },
    ],
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

const projectModel = model<Project & Document>('Project', projectSchema);

export default projectModel;
