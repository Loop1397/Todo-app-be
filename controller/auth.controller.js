const authController = {};
const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 토큰이 valid한지 invalid한지 확인할 뿐일 메소드
authController.authenticate = (req, res, next) => {
    try {
        // 토큰은 헤더를 통해 전달됨
        // 토큰의 값은 'Bearer 어쩌구'가 됨(프론트에서 설정함)
        const tokenString = req.headers.authorization;

        if (!tokenString) {
            throw new Error("invalid token");
        } 

        // 토큰 전달시 국룰로 붙였던 'Bearer '를 다시 떼줌
        const token = tokenString.replace("Bearer ", "");
        
        // 전달받은 토큰이 유효한지 확인하는 메소드
        // 유효하다면 payload, 유효하지 않다면 error를 발생
        // 현재 payload의 안에 들은 값은 _id, iat, exp이며, _id의 경우 User.js에서 jwt를 생성 할 때 넣었기 때문에 나오는 값임.
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if(error) {
                throw new Error("invalid token");
            }

            res.status(200).json({statue: "success", userId: payload._id})
        });
        // req에 userId를 추가함
        req.userId = payload._id;

        // next는 미들웨어
        // 위의 처리가 다 끝난 후 다음 작업으로 넘어가기 위해서 사용하는 메소드임
        // 다음에 부를 메소드 핸들링은 routes에서 
        // router.get('/me', authController.authenticate, userController.getUser);
        next();

    } catch(error) {
        res.status(400).json({status: "fail", message: error.message});
    }
}

module.exports = authController;