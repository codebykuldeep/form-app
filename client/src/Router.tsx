import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import RootLayout from "./components/Layout/RootLayout";
import UserLayout from "./components/Layout/UserLayout";
import UserHome from "./components/User/UserHome";
import VerifyEmail from "./components/User/VerifyEmail";

export const router = createBrowserRouter([
    {
        path:'',
        element:<RootLayout/>,
        children:[
            {
                path:'',
                element:<h1>HOME</h1>,
            },
            {
                path:'login',
                element:<AuthPage/>
            },
            {
                path:'register',
                element:<AuthPage/>
            },
            {
                path:'user',
                element:<UserLayout/>,
                children:[
                    {
                        path:'',
                        element:<UserHome/>
                    },
                    {
                        path:'verify-email',
                        element:<VerifyEmail/>
                    },
                    
                ]
            }
        ]
    },
])