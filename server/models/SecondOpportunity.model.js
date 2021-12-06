const { Schema, model } = require("mongoose")

const secondOpportunitySchema = new Schema({

  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  day: {
    type: Date,
    default: new Date
  },

  trivial: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Trivial'
    },

    dateSelected: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Date'
    },

    guessed: {
      type: Boolean,
      default: false,
    },

    tryAgain: {
      type: String,
      enum: ['PENDING', 'YES', 'NO'],
      default: 'PENDING',
      required: true
    },

}, { timestamps: true })

const SecondOpportunity = model("SecondOpportunity", secondOportunitySchema)

module.exports = SecondOpportunity