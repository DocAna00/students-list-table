const validation = new window.JustValidate('.form', {
  errorFieldCssClass: 'is-invalid',
  errorFieldStyle: {
    border: '1px solid #FF5C00',
  },
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#FF5C00',
    fontSize: '12px',
  },
  focusInvalidField: true,
  lockForm: true,
});

validation
.addField('.add-form__name-inp', [
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Имя должно содержать хотя бы 2 буквы'
  },
  {
    rule: 'maxLength',
    value: 50,
    errorMessage: 'Имя не может содержать более 50 символов'
  },
  {
    rule: 'required',
    errorMessage: 'Вы не ввели имя'
  }
])
.addField('.add-form__surname-inp', [
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Фамилия должна содержать хотя бы 2 буквы'
  },
  {
    rule: 'maxLength',
    value: 50,
    errorMessage: 'Фамилия не может содержать более 50 символов'
  },
  {
    rule: 'required',
    errorMessage: 'Вы не ввели фамилию'
  }
])
.addField('.add-form__middlename-inp', [
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Отчество должно содержать хотя бы 2 буквы'
  },
  {
    rule: 'maxLength',
    value: 50,
    errorMessage: 'Отчество не может содержать более 50 символов'
  },
  {
    rule: 'required',
    errorMessage: 'Вы не ввели отчество'
  }
])
.addField('.add-form__birthdate-inp', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели дату рождения',
  },
])
.addField('.add-form__studyyear-inp', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели год начала обучения',
  },
])
.addField('.add-form__faculty-inp', [
  {
    rule: 'required',
    errorMessage: 'Вы не ввели название факультета',
  },
]);
