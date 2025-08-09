// import axios from 'axios';
// import React, { useEffect } from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';

// const axiosSecure = axios.create({
//      baseURL: `http://localhost:3000`,
// });

// const useAxiosSecure = () => {

//     const {user, signOutUser} = useAuth()
//     const navigate = useNavigate()

//     // console.log(user.accessToken);

//     useEffect(()=>
//     {


//     axiosSecure.interceptors.request.use(config =>{
//         config.headers.Authorization =`Bearer ${user.accessToken} ` 

//         return config;
//     }, error=> {
//         return Promise.reject(error);
//     })

//     axiosSecure.interceptors.response.use(res=>{
//         return res;
//     }, error=>{
//         console.log( 'interceptors', error.status);

//         const status = error.status
//         if(status === 403){
//             navigate('forbidden')
//         }else if (status === 401){
//             signOutUser().then(()=>{
//                  navigate('/signin')
//             }).catch(()=> console.log())
           
//         }

//         return Promise.reject(error)
//     })
//     },
//     [user])


//     return axiosSecure
// };

// export default useAxiosSecure;


import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        console.log('interceptors', error?.response?.status);
        const status = error?.response?.status;

        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          signOutUser()
            .then(() => navigate('/signin'))
            .catch(() => console.log());
        }

        return Promise.reject(error);
      }
    );

    // ⛔ Cleanup: eject interceptor when component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
