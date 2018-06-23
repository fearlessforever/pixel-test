import React,{Component} from 'react'
import { observer } from 'mobx-react'

class FilmList extends Component{
    componentWillUnmount(){
        this.props.store.load=false;
        this.props.store.filmList=[];
    }
    getData(){
        if(!this.props.store.load){ 
            
            fetch(window.helmi.api +'films')
            .then( res => res.json() )
            .then( res =>{
                res.forEach( val =>{
                    this.props.store.newFilm(val)
                })
               return Promise.resolve(); 
            })
            .then(()=>{
                this.props.store.load=true;
            })
        } 
    }
    render(){
        this.getData(); 
        if(!this.props.store.load)
            return(
                <div className="loader"></div>
            )
        let link='',List = this.props.store.filmList.map(val=>{
            link = '/#/film-detail/'+val.id ;

            return <div className="col-md-4 col-sm-6 col-xs-12" key={val.id} >
                <div className="card h-100">
                    <a href={link}><img className="card-img-top" src={val.small_image} alt={val.title} /></a>
                    <div className="card-body">
                    <h4 className="card-title">
                        <a href={link} >{val.title}</a>
                    </h4>
                    <p className="card-text">
                        <label> Release Date : </label> <span className="label label-info">{val.release_date}</span>
                        &nbsp;
                        <label> Rating : </label> <span className="label label-success">{val.rt_score}</span>
                    </p>
                    </div>
                </div>
            </div>
        })            
        return(
            <div className="container">
                <h1>Studio Ghibli Film List</h1>
                 <div className="row">{List}</div>
            </div>
        )
    }
}
export default observer(FilmList);