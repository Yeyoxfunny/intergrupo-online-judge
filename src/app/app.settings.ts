export class AppSettings{
	public static apiEndPoint = "http://localhost:3000/api/";
	
	/* Challenge Settings */
	public static challengeUrl = AppSettings.apiEndPoint + "challenge/";
	public static filesChallengeUrl = AppSettings.apiEndPoint + "upload/file/"

	/* User Settings */
	public static userUrl = AppSettings.apiEndPoint + "users/";
	public static imageProfileUrl = AppSettings.apiEndPoint + "upload/image/";

	/* User Image Profile */
	public static imageProfileBaseUrl = "http://localhost:3000/avatars/";

	public static authUrl = AppSettings.apiEndPoint + "auth/";
}