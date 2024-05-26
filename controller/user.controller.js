const User = require("../model/user");
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
        
        const newUser = new User({email, name, password: hashedPassword});
        await newUser.save();

        res.status(200).json({status:"success"});
    } catch(error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");
        if(user) {
            // 암호화 되어있던 password와 원래의 password가 맞는지 비교
            const isMatch = bcrypt.compareSync(password, user.password);

            if(isMatch) {
                const token = user.generateToken();
                return res.status(200).json({
                    status: "success",
                    user,
                    token
                });
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    } catch(error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}

module.exports = userController;