const { Schema, model } = require("mongoose");



const tokeSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },

    token: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expired: 3600,
    }

})

module.exports = mongoose.model('Token', tokeSchema);

