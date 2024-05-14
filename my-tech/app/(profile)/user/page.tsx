import ProfileSideBar from '@/components/modules/layouts/ProfileSideBar';
import BlogBookmark from '@/components/modules/profile/BlogBookmark';
import Cart from '@/components/modules/profile/Cart';
import Favorite from '@/components/modules/profile/Favorite';
import Info from '@/components/modules/profile/Info';
import OnlyForYou from '@/components/modules/profile/Contribution';
import Order from '@/components/modules/profile/Order';
import Posters from '@/components/modules/profile/Posters';
import { checkUserAccessibility } from '@/utils/authentication/checkUserAccessibility';
import { cookies } from 'next/headers';


const page = async({searchParams}:any) => {
    const param = searchParams['info']


    const user = await checkUserAccessibility(cookies().get("accessToken"))
    console.log(user);

const renderComponent = ()=>{  
    switch(param){
        case 'info':
            return <Info user ={user}/>
        case 'cart':
            return <Cart/>
        case 'orders':
            return  <Order/>
        case 'sell':
            <Posters />
        case "bookMarks":
            <BlogBookmark />
        case 'favorites':
            <Favorite />
        case 'forYou':
            <OnlyForYou/>
        deafault:
            <Info />
    }
}

    return (
        <div style={{display:"flex" , height:'100%' , position:"relative"}}>
            <ProfileSideBar />
            <div style={
            {marginLeft:'80px', width:'100%' , display:"flex" ,
             justifyContent:"center" , alignItems:'center'}
            }>
            {
                renderComponent()
            }
            </div>
        </div>


    );
};

export default page;