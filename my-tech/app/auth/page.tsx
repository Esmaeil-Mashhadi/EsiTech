'use client'
// import LoadingPage from '@/components/constants/loader&notifications/LoadingPage';
import AuthPage from '@/components/templates/AuthPage';
// import { checkUserAccessibility } from '@/utils/authentication/checkUserAccessibility';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import { getCookie } from 'cookies-next';

const page = () => {
    //    const {data, isLoading } = useQuery({queryKey:'profile', queryFn:()=>checkUserAccessibility(getCookie('accessToken')) , retry:1 , refetchOnMount:true , refetchOnWindowFocus:true})
    //    const router = useRouter()
    //    if(isLoading) return <LoadingPage />
    //    if(data && !isLoading){
    //     router.push('/')
    //    }
    return (
        <AuthPage  />
    );
};

export default page;