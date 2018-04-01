import { Schema } from 'mongoose';

export interface Dated {
  startDate : Date;
  effectiveStartDate : Date;
  endDate : Date;
  effectiveEndDate : Date;
}

export const DatedSchema = {
  startDate : {
    type: Schema.Types.Date,
    required : true
  },
  endDate : {
    type: Schema.Types.Date,
    required : true
  },
  effectiveStartDate : {
    type: Schema.Types.Date,
    required : true
  },
  effectiveEndDate : {
    type: Schema.Types.Date,
    required : true
  }
}
