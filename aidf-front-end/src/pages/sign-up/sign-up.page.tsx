import { SignUp } from "@clerk/clerk-react"

function SignUpPage(){
    return (<div className="min-h-screen flex items-center justify-center">
            <SignUp afterSignInUrl={"/"} signInUrl="/sign-in"/>
         </div>
    );
}

export default SignUpPage;