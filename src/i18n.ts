import i18n from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import * as library18n from "@Qinastha/pulse_library/src/i18n";

const additionalResources = {
  en: {
    translation: {
      "button.cancel": "Cancel",
      "button.save": "Save",
      "button.edit": "Edit",
      "button.show": "Show",
      "button.delete": "Delete",
      "button.close": "Close",
      "button.submit": "Submit",
      "button.update": "Update",
      "manageProfile.title": "Profile info",
      "manageProfile.deleteUser": "Delete User",
      "manageProject.addProject": "Add Project",
      "manageProject.editProject": "Update Project",
      "manageProject.newTitle": "New Project",
      "manageProject.editTitle": "Update Project",
      "projectCard.created": "Created At:",
      "projectCard.completed": "Completed At:",
      "projectCard.status": "Status:",
      "projectCard.creator": "Creator:",
      "projectCard.members": "Members:",
      "projectCard.noMembers": "No members",
      "manageList.listName": "List name",
      "manageList.addList": "Add List",
      "manageList.editList": "Edit list",
      "manageTask.newTask": "Add Task",
      "manageTask.editTask": "Edit Task",
      "manageTask.create": "Create Task",
      "manageTask.update": "Update Task",
      "projectTaskList.noTasks": "No tasks available. Please add a new one",
      "projectTaskList.noLists": "No lists available",
      "taskPreview.preview": "Task Preview",
      "taskPreview.title": "Title:",
      "taskPreview.description": "Description:",
      "taskPreview.members": "Members:",
      "taskPreview.checkList": "Check List:",
      "taskPreview.deadline": "Deadline:",
      "taskPreview.department": "Department:",
      "taskPreview.status": "Status:",
      "fixedHeader.switchDark": "Switch to Dark Mode",
      "fixedHeader.switchLight": "Switch to Light Mode",
      "fixedHeader.profile": "Profile Settings",
      "fixedHeader.logout": "Log out",
      "navbar.newProject": "New Project",
      "navbar.dashboard": "Dashboard",
      "navbar.projects": "Projects",
      "login.formTitle": "Log in",
      "login.if": "If you don`t have an account then",
      "login.clickHere": "move to registration page",
      "register.formTitle": "Register",
      "register.if": " If you already have an account then",
      "register.clickHere": "move to login page",
      "project.addList": "Add another list",
      "error.email": "Invalid email address",
      "error.password":
        "Password must contain at least one capital letter and one number, and be at least 8 characters long",
      "error.firstName":
        "First name must start with a capital letter and contain only letters",
      "error.lastName":
        "Last name must start with a capital letter and contain only letters",
      "error.userName": "Username cannot start with symbols or be empty",
      "error.futureDob": "Date of birth cannot be in the future",
      "error.pastDob": "Date of birth cannot be before 1900",
      "error.noPage": "Page not found",
      "error.phoneNumber": "Invalid phone number format.",
      "error.street": "Street address cannot start with symbols or be empty.",
      "error.street2": "Street2 address cannot start with symbols.",
      "error.city": "City cannot start with symbols or be empty.",
      "error.zipCode": "Zip code must be numeric and no more than 10 digits.",
    },
  },
  ua: {
    translation: {
      "button.cancel": "Скасувати",
      "button.save": "Зберегти",
      "button.edit": "Редагувати",
      "button.show": "Показати",
      "button.delete": "Видалити",
      "button.close": "Закрити",
      "button.submit": "Підтвердити",
      "button.update": "Оновити",
      "manageProfile.title": "Профіль",
      "manageProfile.deleteUser": "Видалити користувача",
      "manageProject.addProject": "Додати проект",
      "manageProject.editProject": "Редагувати проект",
      "manageProject.newTitle": "Новий проект",
      "manageProject.editTitle": "Редагувати проект",
      "projectCard.created": "Створено:",
      "projectCard.completed": "Завершено:",
      "projectCard.status": "Статус:",
      "projectCard.creator": "Автор:",
      "projectCard.members": "Учасники:",
      "projectCard.noMembers": "Немає учасників",
      "manageList.listName": "Назва списку",
      "manageList.addList": "Додати список",
      "manageList.editList": "Редагувати список",
      "manageTask.newTask": "Додати завдання",
      "manageTask.editTask": "Редагувати завдання",
      "manageTask.submit": "Створити завдання",
      "manageTask.update": "Оновити",
      "projectTaskList.noTasks":
        "Немає завдань доступних. Будь ласка, додайте нове",
      "projectTaskList.noLists": "Немає списків доступних",
      "taskPreview.preview": "Попередній перегляд",
      "taskPreview.title": "Назва:",
      "taskPreview.description": "Опис:",
      "taskPreview.members": "Учасники:",
      "taskPreview.checkList": "Чек-лист:",
      "taskPreview.deadline": "Кінцева дата:",
      "taskPreview.department": "Відділ:",
      "taskPreview.status": "Статус:",
      "fixedHeader.switchDark": "Змінити на темну тему",
      "fixedHeader.switchLight": "Змінити на світлу тему",
      "fixedHeader.profile": "Налаштування профілю",
      "fixedHeader.logout": "Вийти",
      "navbar.newProject": "Новий проект",
      "navbar.dashboard": "Панель",
      "navbar.projects": "Проекти",
      "login.formTitle": "Вхід",
      "login.if": "Якщо у вас вже є аккаунт",
      "login.clickHere": "перейдіть на сторінку реєстрації",
      "register.formTitle": "Реєстрація",
      "register.if": "Якщо ви не маєте аккаунта",
      "register.clickHere": "перейдіть на сторінку входу",
      "project.addList": "Додати список",
      "error.email": "Невірний email адреса",
      "error.password":
        "Пароль повинен містити хоча б одну велику літеру та одну цифру, та містити не менше 8 символів",
      "error.firstName":
        "Імʼя повинно починатися з великої літери та містити тільки літери",
      "error.lastName":
        "Прізвище повинно починатися з великої літери та містити тільки літери",
      "error.userName":
        "Імʼя користувача не може починатися з символів або бути пустим",
      "error.futureDob": "Дата народження не може бути у майбутньому",
      "error.pastDob": "Дата народження не може бути у минулому",
      "error.noPage": "Сторінка не знайдена",
      "error.phoneNumber": "Невірний формат номера телефону.",
      "error.street": "Адреса не може починатися з символів або бути пустою.",
      "error.street2": "Друга адреса не може починатися з символів.",
      "error.city": "Місто не може починатися з символів або бути пустим.",
      "error.zipCode":
        "Поштовий індекс повинен бути числовим та не більше 10 символів.",
    },
  },
};

library18n.default.addResources(
  "en",
  "translation",
  additionalResources.en.translation,
);
library18n.default.addResources(
  "ua",
  "translation",
  additionalResources.ua.translation,
);

i18n.use(initReactI18next).init({
  resources: library18n.default.options.resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;