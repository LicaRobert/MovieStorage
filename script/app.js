// Movie Class :  Reprezinta un film
class Movie{
    constructor(title, imdbRating, position){
       this.title = title;
       this.imdbRating = imdbRating;
       this.position = position;
    }
}
// UI Class : se ocupa cu task-urile UI
class UI{
    static displayMovies(){

        const movies = Store.getMovies();
        
        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie){

     const list = document.querySelector('#movie-list');
     const row = document.createElement('tr');
     row.innerHTML = `
     <td>${movie.title}</td>
     <td>${movie.imdbRating}</td>
     <td>${movie.position}</td>
     <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td> 
     `;

     list.appendChild(row);
    }

    static deleteBook(eTarget){
        if(eTarget.classList.contains('delete')){
         eTarget.parentElement.parentElement.remove();
        }
    }

    
    //Alerte 
    static showAlert(message, className) {
     const div = document.createElement('div');
     div.className = `alert alert-${className}`;
     div.appendChild(document.createTextNode(message));
     const container = document.querySelector('.container');
     const form = document.querySelector('#movie-form');
     container.insertBefore(div, form);
     
     setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields(){
        document.querySelector('#title').value= '';
        document.querySelector('#imdbRating').value= '';
        document.querySelector('#position').value= '';
    }
}

// Store Class : se ocupa cu pastratul filmelor
class Store{

    static getMovies(){
        let movies;
        if(localStorage.getItem('movies') === null) {
         movies = [];
        } else {
         movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    static addMovie(movie) {
      const movies = Store.getMovies();
      movies.push(movie);
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  
    static removeMovie(title) {
      const movies = Store.getMovies();
      movies.forEach((movie, index) => {
          if(movie.title === title) {
           movies.splice(index, 1);
          }
      });

      localStorage.setItem('movies', JSON.stringify(movies));
    }
}

// Event: arata filmele
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: adauga un film
document.querySelector('#movie-form').addEventListener('submit', (e) =>{
    
     e.preventDefault();

    //luam valoarea form-ului
    const title = document.querySelector('#title').value;
    const imdbRating = document.querySelector('#imdbRating').value;
    const position = document.querySelector('#position').value;

    //validare

    if(title === '' || imdbRating === '' || position === ''){
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else {
    
    //instantiam filmul
    const movie = new Movie(title, imdbRating, position);
   
    // adaugam un film in UI
    UI.addMovieToList(movie);

    // adauga film in store
    Store.addMovie(movie);

    //succes mesaj
    UI.showAlert('Movie Added', 'success');

    //Curatam textbox-urile

    UI.clearFields();
    }

});

// Event: sterge un film
document.querySelector('#movie-list').addEventListener('click', (e)=>{
    //sterge film din UI
   UI.deleteBook(e.target);

   //sterge film din store
   Store.removeMovie(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

   UI.showAlert('Movie Removed', 'success');
});
