const mongoose = require('mongoose');
const slugify = require('slugify');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

EmployeeSchema.pre('save', function() {

    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });

    
});

module.exports = mongoose.model('employee', EmployeeSchema);