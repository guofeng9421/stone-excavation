import router from './index';
router.beforeEach((to,from,next)=>{
    const name =sessionStorage.getItem('name');
    if(name){
        if(to.path==='/login'){
            next('/')
        }else{
            next()
        }
    }else{
        if(to.path==='/login'){
            next()
        }else{
            next({path:'/login'})
        }
    }
})