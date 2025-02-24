import { createBrowserRouter } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import RootLayout from "./components/Layout/RootLayout";
import UserLayout from "./components/Layout/UserLayout";
import UserHome from "./components/User/UserHome";
import VerifyEmail from "./components/ActionPage/VerifyEmail";
import { authLoader } from "./utils/auth-utils";
import TermsPage from "./components/User/TermsPage/TermsPage";
import Dashboard from "./components/User/Dashboard";
import KycPage from "./components/User/KycPage/KycPage";
import BankPage from "./components/User/BankPage/BankPage";
import Home from "./components/UI/Home";
import Kyc from "./components/User/KycPage/Kyc";
import { LoginCallback } from "@okta/okta-react";

export const router = createBrowserRouter([
    {
        path:'',
        element:<RootLayout/>,
        children:[
            {
                path:'',
                element:<Home/>,
            },
            {
                path:'login',
                loader:authLoader,
                element:<AuthPage/>
            },
            {
                path:'login/callback',
                element:<LoginCallback/>
            },
            {
                path:'register',
                loader:authLoader,
                element:<AuthPage/>
            },
            {
                path:'verify-email',
                element:<VerifyEmail/>
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
                        path:'terms',
                        element:<TermsPage/>
                    }, 
                    {
                        path:'kyc',
                        element:<Kyc/>
                    },
                    {
                        path:'bank-detail',
                        element:<BankPage/>
                    },
                    {
                        path:'dashboard',
                        element:<Dashboard/>
                    },            
                ]
            }
        ]
    },
])