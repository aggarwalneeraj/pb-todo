export class Application {
  launchApp(url) {
    cy.visit(url);
  }

  validatePageHeader() {
    cy.get(".header").should("contain", "todos");
  }

  validateRecordingFormFieldExists() {
    cy.get(".new-todo")
      .should("have.attr", "placeholder")
      .and("eq", "What needs to be done?")
      .and("exist");
  }

  validatePageFooters() {
    cy.get(".info > :nth-child(1)").should(
      "contain",
      "Double-click to edit a todo"
    );

    cy.get(".info > :nth-child(2)").should("contain", "Created by petehunt");

    cy.get(".info > :nth-child(3)").should("contain", "Part of TodoMVC");
  }

  validateToDoFiltersDoesNotExist() {
    cy.get(".todo-count").should("not.exist");
    cy.contains("All").should("not.exist");
    cy.contains("Active").should("not.exist");
    cy.contains("Completed").should("not.exist");
  }

  validateClearCompletedDoesNotExist() {
    cy.contains("Clear completed").should("not.exist");
  }

  validateClearCompletedExists() {
    cy.contains("Clear completed").should("exist");
  }

  clickClearCompleted() {
    cy.contains("Clear completed").click();
  }

  validateToDoFiltersExist() {
    cy.contains("All").should("exist");
    cy.contains("Active").should("exist");
    cy.contains("Completed").should("exist");
  }

  recordOneToDoEntry(toDoItem) {
    cy.get(".new-todo").type(toDoItem).type("{enter}");
  }

  validateRecordingFormFieldIsEmpty() {
    cy.get(".new-todo").should("have.value", "");
  }

  validateOneRecordedToDoEntry(toDoItem) {
    cy.get(".edit").should("have.value", toDoItem);
  }

  validateRecordedItemIsNotSelected1() {
    cy.get(".todo-list > li").should("not.have.class", "completed");
  }

  validateRecordedItemIsNotSelected() {
    cy.get(".toggle").should("not.be.checked");
  }

  validateLengthOfToDoList(count) {
    cy.get(".todo-list > li").should("have.length", count);
  }

  validateToDoListDoesNotExist() {
    cy.get(".todo-list > li").should("not.exist");
  }

  validateToDoListExists() {
    cy.get(".todo-list > li").should("exist");
  }

  readLengthOfToDoList() {
    let length = cy.get(".todo-list > li").its("length");

    return length;
  }

  validateDeleteXExists() {
    cy.get(".destroy").should("exist");
  }

  deleteAnAddedEntry() {
    cy.get(".destroy").click({ force: true });
  }

  markAnItemAsCompleted() {
    cy.get(".toggle").click();
  }

  markAllItemsAsCompleted() {
    cy.get(".toggle").click({ multiple: true });
  }

  clickAllFilter() {
    cy.contains("All").click();
  }

  clickActiveFilter() {
    cy.contains("Active").click();
  }

  clickCompletedFilter() {
    cy.contains("Completed").click();
  }

  validateToDoItemsCountExists() {
    cy.get(".todo-count").should("exist");
  }

  validateToDoItemsCountDoesNotExist() {
    cy.get(".todo-count").should("not.exist");
  }

  validateSingleListLengthText() {
    cy.contains("1 item left");
  }

  validateListLengthText(length) {
    cy.contains(`${length} items left`);
  }

  addMultipleToDoItems(itemCount) {
    for (let i = 1; i <= itemCount; i++) {
      this.recordOneToDoEntry(`Item_${i}`);
    }
  }
}
