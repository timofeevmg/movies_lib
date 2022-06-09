/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const	movieDB = {
			movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
			]
	};

	const	adv = document.querySelectorAll('.promo__adv img'),
			poster = document.querySelector('.promo__bg'),
			genre = poster.querySelector('.promo__genre'),
			movieList = document.querySelector('.promo__interactive-list'),
			addForm = document.querySelector('form.add'),// выбрать form, у которого есть класс add
			addInput = addForm.querySelector('.adding__input'),
			checkbox = addForm.querySelector('[type="checkbox"]');

	const	deleteAdv = (arr) => {
		arr.forEach(item => {
			item.remove();
		});
	};

	const	makeChanges = () => {
		genre.textContent = 'драма';

		poster.style.backgroundImage = 'url("img/bg.jpg")';
	};

	const	sortArr = (arr) => {
		arr.sort();
	};

	function	createMovieList(films, parent) {
		parent.innerHTML = "";

		sortArr(films);

		films.forEach((film, i) => {
			parent.innerHTML += `
				<li class="promo__interactive-item">${i + 1} ${film}
					<div class="delete"></div>
				</li>
			`;
		});

		document.querySelectorAll('.delete').forEach((btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				films.splice(i, 1);
				createMovieList(films, parent); // рекурсия
			});
		});
	}

	deleteAdv(adv);
	makeChanges();
	createMovieList(movieDB.movies, movieList);

	addForm.addEventListener('submit', (event) => { //submit - событие отправки формы
		event.preventDefault();

		let		newFilm = addInput.value;
		const	favorite = checkbox.checked;

		if (newFilm) {

			if (newFilm.length > 21) {
				newFilm = `${newFilm.substring(0, 21)}...`;
			}
			
			if (favorite) {
				console.log('Добавляем любимый фильм')
			}

			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies);
	
			createMovieList(movieDB.movies, movieList);
	
			event.target.reset(); //сброс/очистка формы, обращаемся через объект события - наш addForm
		}
	});

});// DOMContentLoaded

// ************** my code, except #3 ****************
// document.addEventListener('DOMContentLoaded', () => {

// 	const movieDB = {
// 		movies: [
// 			"Логан",
// 			"Лига справедливости",
// 			"Ла-ла лэнд",
// 			"Одержимость",
// 			"Скотт Пилигрим против..."
// 		]
// 	};

// 	const adList = document.querySelectorAll('.promo__adv img');
// 	adList.forEach(item => {									// adList.forEach(function (item){
// 		item.remove();											// 	item.remove();
// 	});															// });


// 	const	poster = document.querySelector('.promo__bg'),
// 			genre = poster.querySelector('.promo__genre');

// 	genre.textContent = 'драма';
// 	poster.style.backgroundImage = "url('img/bg.jpg')";

// 	function reloadMovieList() {
// 		const	movieList = document.querySelector('.promo__interactive-list');
// 		movieList.innerHTML = '';
// 		movieDB.movies.sort();
// 		movieDB.movies.forEach((film, i) => {
// 			movieList.innerHTML += `
// 				<li class="promo__interactive-item">${i + 1}. ${film}
// 					<div class="delete"></div>
// 				</li>
// 			`;
// 		});
// 	};
// 	reloadMovieList();

// 	const	affirmButton = document.querySelector('.yes').nextElementSibling,
// 			yesCheckBox = document.querySelector('[type="checkbox"]');

// 	const addNewMovie = (event) => {
// 		event.preventDefault();
// 		const	inputNewMovie = document.querySelector('.adding__input').value;
// 		if (inputNewMovie != '') {
// 			if (inputNewMovie.length > 21) {
// 				const shortMovieName = inputNewMovie.slice(0, 21) + '...';
// 				movieDB.movies.push(shortMovieName);
// 			} else {
// 				movieDB.movies.push(inputNewMovie);
// 			}
// 			reloadMovieList();
// 			document.querySelector('.adding__input').value = '';
// 			console.log(movieDB.movies);
// 		}
// 		if (yesCheckBox.checked == true) {
// 			yesCheckBox.checked = false;
// 		}
// 	};

// 	const showFavorAdding = () => {
// 		if (yesCheckBox.checked == true) {
// 			console.log('Добавляем любимый фильм');
// 		}
// 	};

// 	affirmButton.addEventListener('click', addNewMovie);

// 	yesCheckBox.addEventListener('click', showFavorAdding);

// });//DOMContentLoaded