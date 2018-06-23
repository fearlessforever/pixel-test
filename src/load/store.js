import { observable , decorate } from  'mobx'

class DataLocal {
    filmList = [];
    load=false;
    pageError=false;
    filmDetail={};
    peopleList =[];
    peopleInFilmList =[];
    idFilm = '';

    updateFilmDetail(value){
        this.filmDetail = new filmList(value)
    }
    newFilm(value){ 
        this.filmList.push( new filmList(value) );
        
    }
    newPeople(value){
        this.peopleList.push( new peopleList(value));
    }
    newPeopleOnFilm(value){
        this.peopleInFilmList.push( new peopleList(value));
    }
    reset(){
        this.pageError=false;
        this.load=false;
        this.filmList=[];
        this.filmDetail={};
        this.peopleList=[];
        this.peopleInFilmList=[];
    }
}
class peopleList{
    constructor(value){
        this.id = value.id ? value.id : '';
        this.name = value.name ? value.name : '';
        this.gender = value.gender ? value.gender : '';
        this.age = value.age ? value.age : '';
        this.eye_color = value.eye_color ? value.eye_color : '';
        this.hair_color = value.hair_color ? value.hair_color : ''; 
        this.image = value.image ? value.image : '//placehold.it/700x400';
    }
}
class filmList{
    constructor(value){
        this.id = value.id ? value.id : '';
        this.title = value.title ? value.title : '';
        this.description = value.description ? value.description : '';
        this.director = value.director ? value.director : '';
        this.producer = value.producer ? value.producer : '';
        this.release_date = value.release_date ? value.release_date : '';
        this.rt_score = value.rt_score ? value.rt_score : '';
        this.small_image = value.small_image ? value.small_image : '//placehold.it/700x400';
        this.big_image = value.big_image ? value.big_image : '//placehold.it/700x400';
    }
}
decorate(peopleList,{
    id:observable,
    name:observable,
    gender:observable,
    age:observable,
    eye_color:observable,
    hair_color:observable,
    image:observable,
})
decorate(filmList,{
    id:observable,
    title:observable,
    description:observable,
    director:observable,
    producer:observable,
    release_date:observable,
    rt_score:observable,
    small_image:observable,
    big_image:observable,
})
decorate(
    DataLocal,{
        filmList:observable,
        load:observable,
        pageError:observable,
        filmDetail:observable,
        peopleList:observable,
        peopleInFilmList:observable,
    }
);

export default new DataLocal()