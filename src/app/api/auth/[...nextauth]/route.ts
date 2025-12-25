import { FailedLoginResponse, SuccessLoginResponse } from "@/Interfaces";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({

    providers:[
        CredentialsProvider({
            name:'credintials',
            credentials:{
                email:{},
                password:{}
            },
            authorize:async(credentials)=>{
                    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",{
                        method:"post",
                        body:JSON.stringify({
                                email:credentials?.email,
                                password:credentials?.password
                        }),
                        headers:{'content-type':'application/json'}
                    })
                    const payload: SuccessLoginResponse|FailedLoginResponse =await response.json();
                    if ('token' in payload) {
                        return {
                        id:payload.user.email,
                        user:payload.user,
                        token:payload.token
                        };
                    }
                    else{
                        throw new Error (payload.message)
                    }
            }
        })
    ],
    callbacks:{
        jwt:({token ,user })=>{
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },
        session: ({session , token}) => {
            session.user = token.user as any;
            return session;
        }
    },
    pages:{
        signIn:'/login',
        error:'/login'
    },
    secret:process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }