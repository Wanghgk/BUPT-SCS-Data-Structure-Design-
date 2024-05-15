import React from "react";
import Login from "../pages/Login/Login"
import Menu from "../pages/Menu/Menu";
import MainPage from "../pages/MainPage/MainPage";
import Editor from "../pages/Editor/Editor";
import Diary from "../pages/Diary/Diary";
import Tour from "../pages/Tour/Tour";
import ArticleDetail from "../pages/ArticleDetail/ArticleDetail";
import Publish from "../pages/Publish/Publish";
import Map from "../pages/Map/Map";
export default [
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/tour',
        element: <Tour/>,
        children: [
            {
                path: 'main',
                element: <MainPage/>,
            },
            {
                path: 'menu',
                element: <Menu/>
            },
            {
                path: 'navigate',
                element: <Map/>
            },
            {
                path: 'diary',
                element: <Diary/>,

            },
            {
                path: 'editor',
                element: <Editor/>
            },
            {
                path: 'article/:id',
                element: <ArticleDetail/>
            },
            {
                path: 'publish',
                element: <Publish/>
            }
        ]
    }

]