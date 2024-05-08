'use client'
import AuthPage from '@/components/templates/AuthPage';
import { checkUserAccessibility } from '@/utils/authentication/checkUserAccessibility';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import LoadingPage from '@/components/constants/Notfications&loaders/LoadingPage';


const page = () => {
        const accessToken = getCookie('accessToken')
       const {data, isLoading } = useQuery({queryKey:['profile'], queryFn:():Promise<undefined|null|object>=>checkUserAccessibility(accessToken) , retry:1 , refetchOnMount:true , refetchOnWindowFocus:true})
       const router = useRouter()
       if(isLoading) return <LoadingPage />
       if(data && !isLoading){
        router.push('/')
       }
    return (
        <AuthPage  />
    );
};

export default page;