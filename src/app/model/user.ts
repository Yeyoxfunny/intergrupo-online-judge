export class User {

	public id: string;
	public name: string;
  public surname: string;
	public username: string;
	public email: string;
  public jobTitle: string;
	public imageUrl: string;
  public isAdmin: boolean;

	constructor(userBuilder: UserBuilder){
		this.id = userBuilder.Id;
		this.name = userBuilder.Name;
    this.surname = userBuilder.Surname;
		this.username = userBuilder.UserName;
		this.email = userBuilder.Email;
		this.imageUrl = userBuilder.ImageUrl;
    this.jobTitle = userBuilder.JobTitle;
    this.isAdmin = userBuilder.IsAdmin;
	}
}

export class UserBuilder{
	private id: string;
	private name: string;
  private surname: string;
	private username: string;
	private email: string;
  private jobTitle: string;
	private imageUrl: string;
  private isAdmin: boolean;

	setId(id: string){
		this.id = id;
		return this;
	}

	get Id(){
		return this.id;
	}

	setName(name: string){
		this.name = name;
		return this;
	}

	get Name(){
		return this.name;
	}

  setSurname(surname: string){
    this.surname = surname;
    return this;
  }

  get Surname(){
    return this.surname;
  }

	setUserName(username: string){
		this.username = username;
		return this;
	}

	get UserName(){
		return this.username;
	}

	setEmail(email: string){
		this.email = email;
		return this;
	}

	get Email(){
		return this.email;
	}

	setImageUrl(url: string){
		this.imageUrl = url;
		return this;
	}

	get ImageUrl(){
		return this.imageUrl;
	}

  setJobTitle(jobTitle){
    this.jobTitle = jobTitle;
    return this;
  }

  get JobTitle(){
    return this.jobTitle;
  }

  setIsAdmin(isAdmin: boolean){
    this.isAdmin = isAdmin;
    return this;
  }
  get IsAdmin(){
    return this.isAdmin;
  }

	build(): User{
		return new User(this);
	}

	static getEmptyUser(): User{
		return new UserBuilder()
							.setId('')
							.setName('')
							.setUserName('')
							.setImageUrl('')
							.setEmail('')
              .setIsAdmin(false)
							.build();
	}

}
