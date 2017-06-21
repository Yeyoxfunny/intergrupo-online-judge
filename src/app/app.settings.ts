export class AppSettings{
	public static apiEndPoint = "https://0939da1f.ngrok.io/api/";
	
	/* Challenge Settings */
	public static challengeUrl = AppSettings.apiEndPoint + "challenge/";
	public static filesChallengeUrl = AppSettings.apiEndPoint + "upload/file/"

	/* User Settings */
	public static userUrl = AppSettings.apiEndPoint + "users/";
	public static imageProfileUrl = AppSettings.apiEndPoint + "upload/image/";

	/* User Image Profile */
	public static imageProfileBaseUrl = "https://0939da1f.ngrok.io/avatars/";

	public static authUrl = AppSettings.apiEndPoint + "auth/";
}