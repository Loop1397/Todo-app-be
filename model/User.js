const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    }
}, {timestamps:true});

// object가 JSON으로 변환 될 때 호출되는 함수
// 프론트엔드로 보낼 때에도 JSON으로 변환해서 보내기 때문에, password같이 외부에 함부로 노출하면 안되는 정보같은 경우 해당 함수를 통해 보호할 수 있음
// 화살표 함수에는 this가 없기 때문에, 아래처럼 this를 사용하는 경우 절대로 화살표 함수를 사용하면 안됨!
userSchema.methods.toJSON = function () {
    /** 
     * this._doc:
     *   - this = userSchema 그 자체
     *   - this._doc = userSchema 객체에 들어있는 id, name, email 등의 값
     */ 

    const obj = this._doc;
    delete obj.password;
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};

// jwt를 생성하고 반환하는 함수
userSchema.methods.generateToken = function () {
    const token = jwt.sign({_id: this._id}, JWT_SECRET_KEY, {expiresIn: '1h'});
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;