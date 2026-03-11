//---------------------------------------------------------------------------ЗАВДАННЯ_1-------------------------------------------------------------------------------
function fruitPlay() {
  console.clear();

  let fruits = ["Яблуко", "Апельсин", "Слива"];
  console.log("%cЗавдання 1", "color: white; font-size: 18px");
  console.log("%cЗвичайний масив,", "color: white; font-size: 12px");
  console.log(fruits);
  //______1_____
  fruits.splice(fruits.length - 1, 1);
  console.log("%cВидалення сливи,", "color: white; font-size: 12px");
  console.log(fruits);
  //______2_____
  fruits.unshift("Ананас");
  console.log("%cДодання ананасу,", "color: white; font-size: 12px");
  console.log(fruits);
  //______3_____
  fruits.sort().reverse();
  console.log(
    "%cСортування в зворотньому алфавітному(Я-А) порядку,",
    "color: white; font-size: 12px",
  );
  console.log(fruits);
  //______4_____
  let AppleIndex = fruits.indexOf("Яблуко");
  console.log(
    "%cЗнаходження індексу елементу (Яблуко) масиву",
    "color: white; font-size: 12px",
  );
  console.log(AppleIndex);
}

//---------------------------------------------------------------------------ЗАВДАННЯ_2-------------------------------------------------------------------------------
function colorPlay() {
  console.clear();

  console.log("%cЗавдання 2", "color: white; font-size: 18px");

  //______1_____
  let colors = [
    "Червоний",
    "Помаранчевий",
    "Жовтий",
    "Зелений",
    "Блакитний",
    "Синій",
    "Фіолетовий",
  ];

  //______2_____
  let min = colors[0].length;
  let max = colors[0].length;

  for (let i = 0; i < colors.length; i++) {
    let len = colors[i].length;

    if (len > max) {
      max = len;
    }

    if (len < min) {
      min = len;
    }
  }

  console.log(
    "%cЗнаходження максимальної довжини слова,",
    "color: white; font-size: 12px",
  );
  console.log("Максимум:", max);

  console.log(
    "%cЗнаходження мінімальної довжини слова,",
    "color: white; font-size: 12px",
  );
  console.log("Мінімум:", min);

  //______3_____
  let newColors = [];

  for (let i = 0; i < colors.length; i++) {
    if (colors[i].includes("Синій")) {
      newColors.push(colors[i]);
    }
  }

  console.log(
    "%cПошук кольору 'Синій' у масиві,",
    "color: white; font-size: 12px",
  );
  console.log(newColors);

  //_____4-5_____
  let result = colors.join(",");

  console.log(
    "%cОб'єднання елементів масиву через кому,",
    "color: white; font-size: 12px",
  );
  console.log(result);
}

//---------------------------------------------------------------------------ЗАВДАННЯ_3-------------------------------------------------------------------------------
function employeesPlay() {
  console.clear();

  console.log("%cЗавдання 3", "color: white; font-size: 18px");

  //______1_____
  const employees = [
    { name: "Іван", age: 25, position: "менеджер" },
    { name: "Андрій", age: 35, position: "дизайнер" },
    { name: "Петро", age: 28, position: "розробник" },
  ];

  console.log("%cМасив до сортування,", "color: white; font-size: 12px");
  console.log([...employees]);

  //______2_____
  employees.sort((a, b) => a.name.localeCompare(b.name));

  console.log(
    "%cСортування працівників за ім'ям,",
    "color: white; font-size: 12px",
  );
  console.log(employees);

  //______3_____
  let user = employees.find((item) => item.position == "розробник");

  console.log(
    "%cПошук працівника з посадою 'розробник',",
    "color: white; font-size: 12px",
  );
  console.log(user);

  //______4_____
  for (let i = employees.length - 1; i >= 0; i--) {
    if (employees[i].age >= 30) {
      employees.splice(i, 1);
    }
  }

  console.log(
    "%cВидалення працівників старших або рівних 30 років,",
    "color: white; font-size: 12px",
  );
  console.log([...employees]);

  //______5_____
  employees.unshift({ name: "Ангеліна", age: 19, position: "веб-дизайнер" });

  console.log(
    "%cДодавання нового працівника на початок масиву,",
    "color: white; font-size: 12px",
  );
  console.log(employees);
}

//---------------------------------------------------------------------------ЗАВДАННЯ_4-------------------------------------------------------------------------------
function stydentPlay() {
  console.clear();

  console.log("%cЗавдання 4", "color: white; font-size: 18px");

  //______1_____
  const stydents = [
    { name: "Давид", age: 18, course: "1-й курс" },
    { name: "Ліка", age: 21, course: "4-й курс" },
    { name: "Олексій", age: 19, course: "2-й курс" },
  ];

  console.log("%cПочатковий масив студентів,", "color: white; font-size: 12px");
  console.log([...stydents]);

  //______2_____
  let index = stydents.findIndex((item) => item.name === "Олексій");
  stydents.splice(index, 1);

  console.log(
    "%cВидалення студента 'Олексій',",
    "color: white; font-size: 12px",
  );
  console.log([...stydents]);

  //______3_____
  stydents.unshift({ name: "Віктор", age: 20, course: "3-й курс" });

  console.log(
    "%cДодавання нового студента на початок,",
    "color: white; font-size: 12px",
  );
  console.log([...stydents]);

  //______4_____
  stydents.sort((a, b) => a.age - b.age);

  console.log(
    "%cСортування студентів за віком,",
    "color: white; font-size: 12px",
  );
  console.log([...stydents]);

  //______5_____
  let courseFind = stydents.find((item) => item.course == "3-й курс");

  console.log(
    "%cПошук студента з курсом '3-й курс',",
    "color: white; font-size: 12px",
  );
  console.log(courseFind);
}

//---------------------------------------------------------------------------ЗАВДАННЯ_5-------------------------------------------------------------------------------
function numberPlay() {
  console.clear();

  console.log("%cЗавдання 5", "color: white; font-size: 18px");
  let numbers = [35, 12, 34, 51, 12, 21, 2];
  console.log("%cПочатковий масив цифр,", "color: white; font-size: 12px");
  console.log(numbers);
  //______1_____
  let result = numbers.map(function (item) {
    return item ** 2;
  });
  console.log(
    "%cЧисла піднесені до квадрату,",
    "color: white; font-size: 12px",
  );
  console.log(result);

  //______2_____
  let filtered = numbers.filter((item) => item % 2 === 0);
  console.log("%cЧисла кратні 2-м,", "color: white; font-size: 12px");
  console.log(filtered);

  //______3_____
  let resultSum = numbers.reduce((sum, current) => sum + current, 0);
  console.log("%cСума всіх елементів масиву,", "color: white; font-size: 12px");
  console.log(resultSum);

  //______4_____
  let numbers2 = [1, 3, 5, 7, 9];
  const unitednumber = numbers.concat(numbers2);
  console.log("%cОбєднання двох масивів,", "color: white; font-size: 12px");
  console.log(unitednumber);

  //______5_____
  numbers.splice(0, 5);
  console.log(
    "%cВидалення перших пяти елементів масиву,",
    "color: white; font-size: 12px",
  );
  console.log(numbers);
}

//---------------------------------------------------------------------------ЗАВДАННЯ_6-------------------------------------------------------------------------------
const library = [
  {
    title: "1984",
    author: "Джордж Орвелл",
    genre: "Триллер",
    pages: "406",
    isAvailable: "True",
  },
  {
    title: "Гордість і упередження",
    author: "Джейн Остін",
    genre: "Жахи",
    pages: "316",
    isAvailable: "True",
  },
  {
    title: "Володар перснів",
    author: "Джон Р.Р. Толкін",
    genre: "Фентезі",
    pages: "1323",
    isAvailable: "False",
  },
  {
    title: "Великий Гетсбі",
    author: "Френсіс Скотт Фіцджеральд",
    genre: "Триллер",
    pages: "623",
    isAvailable: "True",
  },
  {
    title: "Маленький принц",
    author: "Антуан де Сент-Екзюпері",
    genre: "Пригоди",
    pages: "124",
    isAvailable: "True",
  },
];

function startMoreFunction() {
  console.clear();

  console.log("%cЗавдання 6", "color: white; font-size: 18px");

  console.log("%cПочатковий список книжок,", "color: white; font-size: 12px");
  console.log([...library]);

  console.log("%cДодавання нової книги,", "color: white; font-size: 12px");
  addBook();
  console.log([...library]);

  console.log(
    "%cВидалення книги 'Великий Гетсбі',",
    "color: white; font-size: 12px",
  );
  removeBook();
  console.log([...library]);

  console.log(
    "%cПошук книги за автором 'Джон Р.Р. Толкін',",
    "color: white; font-size: 12px",
  );
  findBooksByAuthor();

  console.log("%cЗміна статусу книги,", "color: white; font-size: 12px");
  toggleBookAvailability();

  console.log(
    "%cСортування книг за кількістю сторінок,",
    "color: white; font-size: 12px",
  );
  sortBooksByPages();
  console.log(library);

  console.log("%cСтатистика бібліотеки,", "color: white; font-size: 12px");
  console.log(getBooksStatistics());
}

function addBook() {
  library.unshift({
    title: "Кафе на краю світу",
    author: "Джон Стрелекі",
    genre: "Романтика",
    pages: "272",
    isAvailable: "True",
  });
}

function removeBook() {
  let index = library.findIndex((book) => book.title === "Великий Гетсбі");
  library.splice(index, 1);
}

function findBooksByAuthor() {
  let findBook = library.find((item) => item.author === "Джон Р.Р. Толкін");
  console.log(findBook);
}

function toggleBookAvailability(title, isBorrowed) {
  let book = library.find((item) => item.title === "Маленький принц");

  if (book) {
    book.isAvailable = !isBorrowed;
    console.log(book);
  } else {
    console.log("Книгу не знайдено");
  }
}

function sortBooksByPages() {
  library.sort(function (a, b) {
    return Number(a.pages) - Number(b.pages);
  });
}

function getBooksStatistics() {
  const totalBooks = library.length;

  const availableBooks = library.filter((book) => book.isAvailable).length;

  const borrowedBooks = library.filter((book) => !book.isAvailable).length;

  const totalPages = library.reduce((sum, book) => sum + Number(book.pages), 0);

  const averagePages = totalBooks ? totalPages / totalBooks : 0;

  return {
    totalBooks,
    availableBooks,
    borrowedBooks,
    averagePages,
  };
}
//---------------------------------------------------------------------------ЗАВДАННЯ_7-------------------------------------------------------------------------------
function istudents() {
  console.clear();
    console.log("%cЗавдання 7", "color: white; font-size: 18px");
  console.log(
    "%cЗавдання: Робота з об'єктом студента",
    "color: white; font-size: 18px",
  );

  //______1_____
  const istudent = {
    name: "Денис",
    age: 19,
    course: 2,
  };

  //______2_____
  console.log(
    "%cДодавання списку предметів до об'єкта,",
    "color: white; font-size: 12px",
  );
  istudent.subjects = ["Математика", "Програмування", "Англійська"];
  //______3_____
  console.log(
    "%cВидалення властивості 'age' з об'єкта,",
    "color: white; font-size: 12px",
  );
  delete istudent.age;
  //______4_____
  console.log("%cФінальний об'єкт студента,", "color: white; font-size: 12px");

  console.log(istudent);
}
