/**
 * Exception email présent en base de donnée
 */
class EmailFindException extends Error {
  constructor(message: string) {
    super(message)
  }
}
export {EmailFindException}