// Required
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        trim: true,
        maxlength: 75,
        unique: true    
    },
    encrypt_password:{
        type: String,
    },
    salt: String,
    rooms:{
        type: Array,
        default: []
    },
    persons:{
        type: Array,
        default: []
    },
    notifications:{
        type: Array,
        default: []
    }
},{timestamps:true});

// Virtual Field
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

// Methods
userSchema.methods = {
    autheticate: function(plainpassword) {
      return this.securePassword(plainpassword) === this.encrypt_password;
    },
  
    securePassword: function(plainpassword) {
      if (!plainpassword) return "";
      try {
        return crypto
          .createHmac("sha256", this.salt)
          .update(plainpassword)
          .digest("hex");
      } catch (err) {
        return "";
      }
    }
  };

// Export
module.exports = mongoose.model("User",userSchema)