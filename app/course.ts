class Course {
  private name: string;
  private duration: string;
  private static INSTANCE: Course;
  private test: string = 'testing variable';

  private constructor(name: string, duration: string) {
    this.name = name;
    this.duration = duration;
  }

  static createInstance(name: string, duration: string) {
    if (!this.INSTANCE) {
      this.INSTANCE = new Course(name, duration);
    }
    return this.INSTANCE;
  }

  getCourseName() {
    console.log(this.test);
    return this.name;
  }
}

export default Course;
