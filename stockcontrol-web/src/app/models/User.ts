export class User {
    constructor(
      public name: string,
      public email: string,
      public password: string,
      public createdAt: Date,
      public role: string,
      public actived:  boolean,
      public id?: number


    ) {}
  }
  