export class AppSettings{
	public static apiEndPoint = "http://localhost:3001/api/";
	
	/* Challenge Settings */
	public static challengeUrl = AppSettings.apiEndPoint + "challenge/";

	/* User Settings */
	public static userUrl = AppSettings.apiEndPoint + "users/";

	public static authUrl = AppSettings.apiEndPoint + "auth/";
}