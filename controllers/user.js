const User=require("../models/user.js");

module.exports.signup=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.usersignup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeruser=await User.register(newUser,password);
    console.log(registeruser);
    req.login(registeruser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are registered successfully!");
        res.redirect("/listings");
    })
    }
    catch(e){
        req.flash("error","user is already registered with given username.");
        res.redirect("/signup");
    }
};

module.exports.login=(req,res)=>{ 
    res.render("users/login.ejs");
};

module.exports.userlogin=async(req,res)=>{
    req.flash("success","welcome back to WonderLust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    };

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};
