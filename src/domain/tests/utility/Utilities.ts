class Utilities {
  /**
   * Index aléatoire dans 1 tableau
   * @param array 
   * @returns number
   */
  static randomIndexFromArray<T>(array: Array<T>): number {
    return Math.floor(Math.random() * array.length);
  }
}
export { Utilities }
 
