import { Language } from './language';

export class Challenge {
	private Id: string
	private Title: string
	private DescriptionHTML: string
	private Languages: Language[]
	private Difficulty: string

	constructor(challengeBuilder: ChallengeBuilder){
		this.Id = challengeBuilder.Id;
		this.Title = challengeBuilder.Title;
		this.DescriptionHTML = challengeBuilder.DescriptionHTML;
		this.Languages = challengeBuilder.Languages;
		this.Difficulty = challengeBuilder.Difficulty;
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

export class ChallengeBuilder{
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

	build(): Challenge{
		return new Challenge(this);
	}

	static getEmptyTest(): Challenge{
		return new ChallengeBuilder()
							.setId("")
							.setTitle("")
							.setDescriptionHTML("")
							.setLanguages([])
							.setDifficulty("")
							.build();
	}
}
