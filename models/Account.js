/**
 * Account (domaine)
 * @param {{ id: string, firstName: string, lastName: string, records: object }} props
 */
export class Account {
  constructor({ id, firstName, lastName, records = {} }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.records = records;
  }

  /**
   * Retourne le nom complet
   */
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
