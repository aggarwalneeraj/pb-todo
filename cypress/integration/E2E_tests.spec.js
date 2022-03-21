import { Application } from "./../pages/PageObject";

// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("E2E testing of PB sample app", function () {
  const application = new Application();

  before(function () {
    application.launchApp("./");
  });

  this.afterEach(function () {
    cy.reload();
  });

  describe("Validate Static text on the page", function () {
    it("Static text validation just after application launch", () => {
      application.validatePageHeader();
      application.validateRecordingFormFieldExists();
      application.validateToDoItemsCountDoesNotExist();
      application.validateToDoFiltersDoesNotExist();
      application.validateClearCompletedDoesNotExist();
      application.validatePageFooters();
    });

    it("Static text validation after recording a dynamically created to do item", () => {
      let toDoItem = `MyItem_${Date.now()}`;

      application.recordOneToDoEntry(toDoItem);
      application.validatePageHeader();
      application.validateRecordingFormFieldExists();
      application.validateToDoItemsCountExists();
      application.validateToDoFiltersExist();
      application.validateClearCompletedDoesNotExist();
      application.validatePageFooters();
    });
  });

  describe("Parametrized test - Validate diff input formats for to do items", () => {
    const inputData = [
      ["TestItem", "Alphabets"],
      ["1234", "Numerals"],
      ["Test1234", "Alphanumeric"],
      ["!@#$%^&*()", "Special characters"],
      ["abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz", "Long item"],
      [" abcde", "Starts with a white space"],
      ["abcde ", "Ends with a white space"],
      [`ToDo_${Date.now()}`, "Dynamically generated"],
    ];

    inputData.forEach(($input) => {
      const [inputItem, Description] = $input;

      it(`Should be able to record ${inputItem} of type ${Description}`, () => {
        application.recordOneToDoEntry(inputItem);
        application.validateOneRecordedToDoEntry(inputItem);
      });
    });
  });

  context("Tests after recording a single to do item", () => {
    it("Validate a to do item has been recorded correctly", () => {
      const toDoItem = "Ab1234";

      application.recordOneToDoEntry(toDoItem);
      application.validateOneRecordedToDoEntry(toDoItem);
      application.validateRecordedItemIsNotSelected();
      application.validateRecordingFormFieldIsEmpty();
      application.validateLengthOfToDoList(1);
    });

    specify("Validate user is able to add and delete an added entry", () => {
      application.recordOneToDoEntry("myItem");
      application.validateDeleteXExists();
      application.deleteAnAddedEntry();
      application.validateLengthOfToDoList(0);
    });

    it("Validate user records an entry, checkmark and uncheck it back", () => {
      application.recordOneToDoEntry("1234");
      application.markAnItemAsCompleted();
      application.validateLengthOfToDoList(1);
      application.validateListLengthText(0);
      application.markAnItemAsCompleted();
      application.validateLengthOfToDoList(1);
      application.validateSingleListLengthText();
    });

    it("Validate user records an entry, checkmark it as completed and clear", () => {
      application.recordOneToDoEntry("entryToBeCleared");
      application.markAnItemAsCompleted();
      application.validateClearCompletedExists();
      application.clickClearCompleted();
      application.validateLengthOfToDoList(0);
      application.validateToDoListDoesNotExist();
    });

    it("Validate user is not able to record a white space item", () => {
      const blankItem = " ";

      application.recordOneToDoEntry(blankItem);
      application.validateToDoListDoesNotExist();
    });
  });

  describe("Tests after recording multiple to do items", () => {
    it("Validate same to do item can be recorded", () => {
      application.recordOneToDoEntry("Test Duplicate item");
      application.recordOneToDoEntry("Test Duplicate item");
      application.validateLengthOfToDoList(2);
    });

    it("Add multiple items and validate length of the list", () => {
      let itemCount = 10;

      application.addMultipleToDoItems(itemCount);
      application.validateLengthOfToDoList(itemCount);
      application.validateListLengthText(itemCount);
    });

    specify("Test all filters", () => {
      let itemCount = 5;

      application.addMultipleToDoItems(itemCount);
      application.markAllItemsAsCompleted();
      application.clickActiveFilter();
      application.validateListLengthText(0);
      application.validateToDoListDoesNotExist();
      application.clickAllFilter();
      application.validateLengthOfToDoList(itemCount);
    });
  });
});
