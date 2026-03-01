import { lazy,Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy (() => import('../pages/Home'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<div className="p-10 text-center fomt-bold">Loading......</div>}><Home/></Suspense>
    },
])