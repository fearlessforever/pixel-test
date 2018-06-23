import React,{Component} from 'react'
import { observer } from 'mobx-react'
import ErrorPage from './Error404'

import {shuffle} from '../load/function_list'

class FilmDetail extends Component{
    componentWillUnmount(){
        this.props.store.reset();
    } 
    getData(){
        if(!this.props.store.load){ 
            let idFilm = this.props.store.idFilm;
            fetch( window.helmi.api + 'films/'+ idFilm )
            .then( res => res.json() )
            .then( res => {
                if(!res.id)throw Error('Data not found')
                
                this.props.store.updateFilmDetail(res);
                return fetch( window.helmi.api+'films');
            })
            .then( res => res.json() )
            .then( res =>{
                shuffle(res);
                res.forEach( val => {
                    this.props.store.newFilm(val);
                })
                return fetch( window.helmi.api + 'people');
            })
            .then( res => res.json() )
            .then( res => {
                shuffle(res);
                let ada=false;
               // alert(idFilm)
                var regex = new RegExp( idFilm );
                res.forEach( val => {
                    ada=false;
                    val.films.forEach( val2 =>{ 
                        if( val2.match(regex) )ada=true;
                    })
                    if(ada){
                        this.props.store.newPeopleOnFilm(val); 
                    }else{
                        this.props.store.newPeople(val);
                    }                    
                })
                return Promise.resolve();
            })
            .then(()=>{
                this.props.store.load=true;
            })
            .catch( error =>{ 
                this.props.store.pageError=true;
            })
        }
    }
    componentDidMount(){
        this.props.store.idFilm = this.props.match.params.sub;
        this.getData();
    }
    onClick(e){ 
        this.props.store.idFilm = e.target.getAttribute('href').replace(/.*film-detail\//,'');
        this.props.store.reset();
        this.getData();
    }
    render(){
        if(this.props.store.pageError)
            return <ErrorPage obj={{error:'Film ID not Found'}} />
        if(!this.props.store.load)
            return(
                <div className="loader"></div>
            )
        let {filmDetail} = this.props.store ;
        let link = '',count=0,othersFilm = this.props.store.filmList.map( val =>{
            ++count; link ='#/film-detail/'+val.id;
            return ( count > 5 || val.id === filmDetail.id) ? '' : 
                <div className="col-md-12" key={val.id} >
                    <div className="card h-100">
                        <a onClick={this.onClick.bind(this)} href={link}><img className="card-img-top" src={val.small_image} alt={val.title} /></a>
                        <div className="card-body">
                        <h4 className="card-title">
                            <a onClick={this.onClick.bind(this)} href={link} >{val.title}</a>
                        </h4>
                        <p className="card-text">
                            <label> Release Date : </label> <span className="label label-info">{val.release_date}</span> &nbsp;
                            <label> Rating : </label> <span className="label label-success">{val.rt_score}</span> 
                        </p>
                        </div>
                    </div>
                </div>
        });
        let listPeople = this.props.store.peopleList.map( (val,k) =>{
            return <div key={val.id} className="col-md-2 col-xs-6 people">
                        <div >
                            <img src={val.image} alt="" className="img-responsive img-circle" style={{width:'60px',height:'60px'}} />
                        </div>
                        <h4 className="people">{val.name}</h4>  
                    </div>
        });
        let listPeopleInvolve = this.props.store.peopleInFilmList.map((val )=>{
            return <div class="media" key={val.id} >
                        <div class="media-left">
                        <img alt="" src={val.image} class="media-object" style={{width:'60px',height:'60px'}} />
                        </div>
                        <div class="media-body">
                        <h4 class="media-heading">{val.name}</h4>
                        <p>
                            <label>Age : </label> <span className="label label-info">{val.age}</span> &nbsp;
                            <label>Eye Color : </label> <span className="label label-warning">{val.eye_color}</span> &nbsp;
                            <label>Gender : </label> <span className="label label-default">{val.gender}</span> &nbsp;
                            <label>Hair Color : </label> <span className="label label-succes">{val.hair_color}</span> 
                        </p>
                        </div>
                    </div>
        })
        return(
            <div className="container">
                <div className="center">
                    <div className="col-md-8">
                        <h1 >{ filmDetail.title }</h1>
                        <div className="card h-100">
                            <a href={link}><img className="card-img-top" src={filmDetail.big_image} alt={filmDetail.title} /></a>
                            <div className="card-body">
                            <h4 className="card-title">
                                <a href={link} >{filmDetail.title}</a>
                            </h4>
                            <p className="card-text">
                                <label> Release Date : </label> <span className="label label-info">{filmDetail.release_date}</span> &nbsp;
                                <label> Rating : </label> <span className="label label-success">{filmDetail.rt_score}</span>&nbsp;
                                <label> Director : </label> <span className="label label-warning">{filmDetail.director}</span> &nbsp;
                                <label> Producer : </label> <span className="label label-default">{filmDetail.producer}</span> &nbsp;
                                <br/>
                                {filmDetail.description}
                            </p>
                            </div>
                            {
                                this.props.store.peopleInFilmList.length > 0 ? 
                                <div style={{padding:'5px'}}>
                                    <h3 style={{fontWeight:'bold'}}> People In this Film </h3>
                                    {listPeopleInvolve}
                                </div> : <h4 style={{fontWeight:'bold'}}>There's no people registered in this film </h4>
                            }
                            
                        </div>
                        <div >
                            <h3>Other People you might wanna know</h3>
                            {listPeople}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3>You might wanna check this out</h3>
                        {othersFilm}
                    </div>
                </div>
            </div>
        )
    }
}
export default observer(FilmDetail);