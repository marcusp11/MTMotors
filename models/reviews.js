var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({

    model : String,
    uName : String,
    date : Date,
    comment : {
        subject : String,
        body : String
    },
    rating : String,
    
});

var Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;