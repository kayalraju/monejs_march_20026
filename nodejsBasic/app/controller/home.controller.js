


class HomeControler{

    async Home(req,res){
        const user={
            name:'webskitters',
            age:30
        }
        res.render('home',{
            title:"home page",
            data:user
        })
    }
    async about(req,res){
        res.render('about',{
            title:"about page",
            city:'pune'
        })
    }

}


module.exports=new HomeControler()