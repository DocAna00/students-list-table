(() => {
  const SERVER_URL = 'http://localhost:3000'

  async function serverAddStudent(obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })

    let data = await response.json()

    return data
  }

  async function serverDeleteStudent(id) {
    let response = await fetch(SERVER_URL + '/api/students/' + id, {
      method: "DELETE"
    })

    let data = await response.json()

    return data
  }

  // Массив со списком студентов
  // let listData = [
  //   {
  //     name: 'Иван',
  //     surname: 'Иванов',
  //     lastname: 'Иванович',
  //     birthday: '1993-08-14',
  //     studyStart: 2020,
  //     faculty: 'Естественные науки'
  //   },
  //   {
  //     name: 'Анна',
  //     surname: 'Лапшова',
  //     lastname: 'Юрьевна',
  //     birthday: '1998-02-15',
  //     studyStart: 2021,
  //     faculty: 'Лингвистика'
  //   },
  //   {
  //     name: 'Анастасия',
  //     surname: 'Боровина',
  //     lastname: 'Алексеевна',
  //     birthday: '1997-07-11',
  //     studyStart: 2019,
  //     faculty: 'Востоковедение'
  //   },
  //   {
  //     name: 'Александр',
  //     surname: 'Деловицкий',
  //     lastname: 'Викторович',
  //     birthday: '2000-11-23',
  //     studyStart: 2022,
  //     faculty: 'Исторический'
  //   },
  //   {
  //     name: 'Лев',
  //     surname: 'Невский',
  //     lastname: 'Александрович',
  //     birthday: '2001-10-27',
  //     studyStart: 2020,
  //     faculty: 'Экономический'
  //   },
  // ]
  let listData = []
  let sortColumnFlag = 'snm'
  let sortDirFlag = true

  // Создание элементов
  const $app = document.getElementById('app'),
    $addForm = document.getElementById('add-form'),
    $nameInp = document.getElementById('add-form__name-inp'),
    $surnameInp = document.getElementById('add-form__surname-inp'),
    $middlenameInp = document.getElementById('add-form__middlename-inp'),
    $birthDateInp = document.getElementById('add-form__birthdate-inp'),
    $yearStudyInp = document.getElementById('add-form__studyyear-inp'),
    $facultyInp = document.getElementById('add-form__faculty-inp'),
    $filterForm = document.getElementById('filter-form'),
    $snmFilterInp = document.getElementById('filter-form__snm-inp'),
    $facultyFilterInp = document.getElementById('filter-form__faculty-inp'),
    $yearStudyFilterInp = document.getElementById('filter-form__yearstudy-inp'),
    $finishYearFilterInp = document.getElementById('filter-form__yearfinish-inp'),
    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody'),
    $tableHeadTr = document.createElement('tr'),
    $tableHeadThSNM = document.createElement('th'),
    $tableHeadThBirthDate = document.createElement('th'),
    $tableHeadThStudyYear = document.createElement('th'),
    $tableHeadThFaculty = document.createElement('th'),
    $tableHeadDelete = document.createElement('th');

  $table.classList.add('table', 'table-info', 'table-striped', 'table-bordered')

  $tableHeadThSNM.textContent = 'ФИО'
  $tableHeadThBirthDate.textContent = 'Дата рождения'
  $tableHeadThStudyYear.textContent = 'Годы обучения'
  $tableHeadThFaculty.textContent = 'Факультет'
  $tableHeadDelete.textContent = 'Удаление'

  $tableHeadTr.append($tableHeadThSNM)
  $tableHeadTr.append($tableHeadThBirthDate)
  $tableHeadTr.append($tableHeadThStudyYear)
  $tableHeadTr.append($tableHeadThFaculty)
  $tableHeadTr.append($tableHeadDelete)

  $tableHead.append($tableHeadTr)
  $table.append($tableHead)
  $table.append($tableBody)
  $app.append($table)

  function createUserTr(oneUser) {
    const $userTr = document.createElement('tr'),
      $userSNM = document.createElement('th'),
      $userBirthDate = document.createElement('th'),
      $userStudyYear = document.createElement('th'),
      $userFaculty = document.createElement('th'),
      $userDelete = document.createElement('th'),
      $btnDelete = document.createElement('btn');


    $btnDelete.classList.add("btn", "btn-danger", "w-100")

    $userSNM.textContent = oneUser.snm
    $userBirthDate.textContent = oneUser.birthday + ' (' + (2023 - Number(oneUser.birthday.substr(0, 4))) + ')'
    $userStudyYear.textContent = oneUser.studyStart + '-' + (Number(oneUser.studyStart) + 4) + ' (' + (2023 - oneUser.studyStart) + ' ' + 'курс)'
    if (oneUser.studyStart <= 2018) {
      $userStudyYear.textContent = oneUser.studyStart + '-' + (Number(oneUser.studyStart) + 4) + ' (закончил)'
    }
    $userFaculty.textContent = oneUser.faculty

    $btnDelete.textContent = 'Удалить'
    $btnDelete.addEventListener('click', async function () {
      await serverDeleteStudent(oneUser.id)
      $userTr.remove()
    })

    $userTr.append($userSNM)
    $userTr.append($userBirthDate)
    $userTr.append($userStudyYear)
    $userTr.append($userFaculty)
    $userDelete.append($btnDelete)
    $userTr.append($userDelete)

    return $userTr
  }


  // Сортировка
  function sortData(stArr) {
    let copyListData = [...stArr];

    copyListData = copyListData.sort(function (a, b) {
      let sort = a[sortColumnFlag] < b[sortColumnFlag]
      if (sortDirFlag === false) sort = a[sortColumnFlag] > b[sortColumnFlag]
      if (sort) return -1
    })

    return copyListData;
  }

  // Фильтр
  function filterData(stArr) {
    let copyListData = [...stArr];

    if ($snmFilterInp.value.trim() !== "") {
      copyListData = copyListData.filter(function (oneUser) {
        if (oneUser.snm.toLowerCase().includes($snmFilterInp.value.trim())) return true
      })
    }

    if ($facultyFilterInp.value.trim() !== "") {
      copyListData = copyListData.filter(function (oneUser) {
        if (oneUser.faculty.toLowerCase().includes($facultyFilterInp.value.trim())) return true
      })
    }

    if ($yearStudyFilterInp.value.trim() !== "") {
      copyListData = copyListData.filter(function (oneUser) {
        if (String(oneUser.studyStart).includes($yearStudyFilterInp.value.trim())) return true
      })
    }

    if ($finishYearFilterInp.value.trim() !== "") {
      copyListData = copyListData.filter(function (oneUser) {
        if (String(oneUser.finishYear).includes($finishYearFilterInp.value.trim())) return true
      })
    }

    return copyListData;
  }

  // Заполнение таблицы / рендер
  function render(arr) {
    let copyArr = [...arr]

    $tableBody.innerHTML = ''

    // Отрисовка
    for (const oneUser of copyArr) {
      oneUser.snm = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastname
      oneUser.finishYear = oneUser.studyStart + 4
      const $newTr = createUserTr(oneUser)
      $tableBody.append($newTr)
    }
  }

  // Работа с формой
  $addForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    // Не позволяет добавлять пустые строки в таблицу
    if ($nameInp.value.trim() === "") {
      return
    }

    if ($surnameInp.value.trim() === "") {
      return
    }

    if ($middlenameInp.value.trim() === "") {
      return
    }

    if ($birthDateInp.value.trim() === "") {
      return
    }

    if ($yearStudyInp.value.trim() === "") {
      return
    }

    if ($facultyInp.value.trim() === "") {
      return
    }

    let newStudentObj = {
      name: $nameInp.value.trim(),
      surname: $surnameInp.value.trim(),
      lastname: $middlenameInp.value.trim(),
      birthday: $birthDateInp.value.trim(),
      studyStart: $yearStudyInp.value.trim() - 0,
      faculty: $facultyInp.value.trim()
    }

    let serverDataObj = await serverAddStudent(newStudentObj)

    listData.push(serverDataObj)

    render(listData)

    document.getElementById('add-form').reset()
  })

  // События сортировки
  $tableHeadThSNM.style.cursor = "pointer"
  $tableHeadThSNM.addEventListener('click', function () {
    sortColumnFlag = 'snm'
    sortDirFlag = !sortDirFlag
    const sortArr = sortData(listData);
    render(sortArr);
  })

  $tableHeadThBirthDate.style.cursor = "pointer"
  $tableHeadThBirthDate.addEventListener('click', function () {
    sortColumnFlag = 'birthday'
    sortDirFlag = !sortDirFlag
    const sortArr = sortData(listData);
    render(sortArr);
  })

  $tableHeadThFaculty.style.cursor = "pointer"
  $tableHeadThFaculty.addEventListener('click', function () {
    sortColumnFlag = 'faculty'
    sortDirFlag = !sortDirFlag
    const sortArr = sortData(listData);
    render(sortArr);
  })

  $tableHeadThStudyYear.style.cursor = "pointer"
  $tableHeadThStudyYear.addEventListener('click', function () {
    sortColumnFlag = 'studyStart'
    sortDirFlag = !sortDirFlag
    const sortArr = sortData(listData);
    render(sortArr);
  })

  // События фильтра
  $filterForm.addEventListener('submit', function (event) {
    event.preventDefault()
  })

  let filterInputsArr = [$snmFilterInp, $facultyFilterInp, $yearStudyFilterInp, $finishYearFilterInp];

  for (const item of filterInputsArr) {
    item.addEventListener('input', function () {
      const filteredData = filterData(listData);
      render(filteredData);
    })

  }

  // GET
  async function serverGetStudent() {
    let response = await fetch(SERVER_URL + '/api/students', {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })

    let data = await response.json()

    return data
  }

  async function startApp() {
    let serverData = await serverGetStudent()

    if (serverData) {
      listData = serverData
    }

    render(listData)
  }

  startApp()
})();
