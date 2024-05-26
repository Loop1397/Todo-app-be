const User = require("../model/User");
const bcrypt = require('bcrypt');

// 비밀번호를 해쉬화해서 저장하기 위해 bcrypt 사용
// 암호화 횟수
const saltRounds = 10;

userController = {}

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({email});

        if(user) {
            res.status(404).json({
                status: "fail",
                message: "이미 가입된 이메일입니다."
            });

            return 0;
        }

        // 암호화 이전 비밀번호 뒤에 추가로 붙여지는 랜덤한 값 
        const salt = bcrypt.genSaltSync(saltRounds);
        // 비밀번호 + salt를 토대로 암호화 
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        const newUser = new User({email, name, hashedPassword});
        await newUser.save();

        res.status(200).json({status:"success"});
    } catch(error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

module.exports = userController;