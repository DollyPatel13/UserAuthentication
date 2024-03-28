import session from "express-session"

import userModel from "../model/userModel.js"

import bcrypt from 'bcrypt'

class Controller {
    static login_get = (req,res)=>{
        // req.session.isValid = true
        // console.log(req.session)
        // console.log(req.session.id)
        const msg = req.session.msg
        const myMsg = msg
        delete req.session.msg
        res.render('login.ejs',{myMsg})
    }

    static dashboard_get =(req,res)=>{
        const myMsg = req.session.msg
         
        delete req.session.msg

        res.render('dashboard.ejs',{myMsg})
    }
   
    static logout_post =(req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                throw err
            }
            else{
                res.redirect('/')
            }
        })
    }
    static home_get = (req,res)=>{
        res.render('home.ejs')
    }
    static signup_get = (req,res)=>{
        const myMsg = req.session.msg
        delete req.session.msg
        res.render('signup.ejs',{myMsg})
    }

    static signup_post = async (req,res)=>{
        try{
            const form_data = req.body;
    

            //Confirm that it is not an existing user

           let user = await userModel.findOne({email : form_data.email})

           if(user){
                req.session.msg =`${user.name} is an existing user. Please Log In`
                
                res.redirect('/login')
           }

           const hashedPwd = await bcrypt.hash(form_data.pwd,10)

            if(!user){
                 user = new userModel({
                    name : form_data.name,
                    email: form_data.email,
                    pwd: hashedPwd

                })
               const user_saved = user.save();

               req.session.msg =` Sign Up successfull .${user.name}  Please Log In.`
               res.redirect('/login')

            }
        }
        catch(err){

        }
    }

    static login_post= async(req,res)=>{
        try{
            const form_data = req.body

            const existing_user = await userModel.findOne({email: form_data.email})
             
            if(!existing_user){
                  req.session.msg = `Not an existing user. Please Sign Up`
                 return res.redirect('/signup')
            }
            
           //To compare passwords
            const user_matched = await bcrypt.compare(form_data.pwd, existing_user.pwd)
            if(user_matched){
                req.session.isValid = true
                req.session.msg = `Welcome ${existing_user.name}`
                 res.redirect('/dashboard')

            }
            else{
                req.session.msg = `Incorrect Password .Please enter a correct password`
                return res.redirect('/login')
            }

           
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }

    

}

export default Controller