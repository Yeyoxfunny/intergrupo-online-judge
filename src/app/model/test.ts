import { Language } from './language';

export class Test {
	private Id: string
	private Title: string
	private DescriptionHTML: string
	private Languages: Language[]
	private Difficulty: string

	constructor(testBuilder: TestBuilder){
		this.Id = testBuilder.Id;
		this.Title = testBuilder.Title;
		this.DescriptionHTML = testBuilder.DescriptionHTML;
		this.Languages = testBuilder.Languages;
		this.Difficulty = testBuilder.Difficulty;
	}

	get id(){
		return this.Id;
	}

	get title(){
		return this.Title;
	}

	get descriptionHTML(){
		return this.DescriptionHTML;
	}

	get languages(){
		return this.Languages;
	}

	get difficulty(){
		return this.Difficulty;
	}
}

export class TestBuilder{
	private id: string
	private title: string
	private descriptionHTML: string
	private languages: Language[]
	private difficulty: string

	setId(id: string){
		this.id = id;
		return this;
	}

	get Id(){
		return this.id;
	}

	setTitle(title: string){
		this.title = title;
		return this;
	}

	get Title(){
		return this.title;
	}

	setDescriptionHTML(description: string){
		this.descriptionHTML = description;
		return this;
	}

	get DescriptionHTML(){
		return this.descriptionHTML;
	}

	setLanguages(languages: Language[]){
		this.languages = languages;
		return this;
	}

	get Languages(){
		return this.languages;
	}

	setDifficulty(difficulty: string){
		this.difficulty = difficulty;
		return this;
	}

	get Difficulty(){
		return this.difficulty;
	}

	build(): Test{
		return new Test(this);
	}

	static getEmptyTest(): Test{
		return new TestBuilder()
							.setId("")
							.setTitle("")
							.setDescriptionHTML("")
							.setLanguages([])
							.setDifficulty("")
							.build();
	}
}
